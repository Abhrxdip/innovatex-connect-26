import User from "../models/User.js";
import Referral from "../models/Referral.js";
import {
  z
} from "zod"
import {
  hashPassword,
  comparePassword
} from "../utils/hash.js";
import {
  generateToken
} from "../utils/jwt.js";
import {
  ROLES,
  AUTH_PROVIDERS
} from "../config/constants.js";
import {
  redisClient
} from "../config/redis_connection";
import {
  verifyOTPForOnboardingUsers,
  verifyOTPForRegisteredUsers
} from "./otp.service";

const emailSchema = z.string().trim().toLowerCase().email();
const phoneRegExp = /^(?:\+91|91|0)?([6-9]\d{9})$/;

export async function registerUser({
  name,
  email,
  password,
  role,
  college,
  company,
  phone,
  otp,
  referralCode,
  auth_provider
}) {

  //? Normalize Email first for security and duplicacy
  if (!emailSchema.safeParse(email).success) {
    const error = new Error("Email not valid")
    error.statusCode = 400;
    throw error;
  }
  email = emailSchema.parse(email)

  const match = phone.replace(/[\s-]/g, '').match(phoneRegExp)
  if (match) {
    phone = match[1]
  } else {
    const error = new Error("Phone number not valid")
    error.statusCode = 400;
    throw error;
  }


  const existingUser = await User.findOne({
    "$or": [{
      email: email
    }, {
      phone: phone
    }]
  });

  if (existingUser) {
    const error = new Error("User already exists with this email or phone");
    error.statusCode = 400;
    throw error;
  }


  const hashedPassword = await hashPassword(password);
  //! Check this else an user can just send api req to the server and make themselves as admin
  if (role !== "Student" && role !== "Working Professional" && role !== "Community Partner") {
    const error = new Error("Role not defined");
    error.statusCode = 400
    throw error
  }

  if (!otp) {
    const error = Error("OTP not provided")
    error.statusCode = 400
    throw error
  }

  const res = await verifyOTPForOnboardingUsers({
    email,
    otp
  })

  if (!res) {
    const error = Error("OTP Incorrect")
    error.statusCode = 401
    throw error
  }


  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: role || ROLES.STUDENT,
    college: college || "",
    company: company || "",
    phone: phone || "",
    provider: auth_provider ? auth_provider : AUTH_PROVIDERS.MANUAL,
  });

  if (referralCode) {
    // Find the specific partner whose ID matches the referral code suffix
    const partners = await User.find({
      role: ROLES.COMMUNITY_PARTNER
    });
    const partner = partners.find(p => {
      const expectedCode = `IXC-${p._id.toString().substring(18).toUpperCase()}`;
      return expectedCode === referralCode.toUpperCase();
    });

    if (partner) {
      await Referral.create({
        partnerId: partner._id,
        referredUser: user._id,
        referralCode: referralCode.toUpperCase(),
      });
    }
  }

  const token = generateToken({
    userId: user._id,
    email: user.email,
    role: user.role,
  });

  const userObj = user.toObject();
  delete userObj.password;

  return {
    user: userObj,
    token
  };
}

export async function googleLoginUser({
  name,
  email,
  referralCode
}) {
  if (!emailSchema.safeParse(email).success) {
    const error = new Error("Email not valid");
    error.statusCode = 400;
    throw error;
  }
  email = emailSchema.parse(email);

  let user = await User.findOne({
    email
  });
  let isNewUser = false;

  if (!user) {
    user = await User.create({
      name,
      email: email,
      password: "",
      role: ROLES.STUDENT,
      college: "",
      company: "",
      phone: "",
      provider: AUTH_PROVIDERS.GOOGLE,
    });
    isNewUser = true;

    if (referralCode) {
      const partners = await User.find({
        role: ROLES.COMMUNITY_PARTNER
      });
      const partner = partners.find(p => {
        const expectedCode = `IXC-${p._id.toString().substring(18).toUpperCase()}`;
        return expectedCode === referralCode.toUpperCase();
      });

      if (partner) {
        await Referral.create({
          partnerId: partner._id,
          referredUser: user._id,
          referralCode: referralCode.toUpperCase(),
        });
      }
    }
  }

  const token = generateToken({
    userId: user._id,
    email: user.email,
    role: user.role,
  });

  const userObj = user.toObject();
  delete userObj.password;

  return {
    user: userObj,
    token,
    isNewUser
  };
}

export async function updateUserDetails({
  _id,
  role,
  college,
  company,
  phone
}) {
  try {

    if (role !== "Student" && role !== "Working Professional" && role !== "Community Partner") {
      const error = new Error("Role not defined");
      error.statusCode = 400
      throw error
    }

    const userById = await User.findOne({
      _id: _id,
    });
    if (!userById) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    if (phone) {
      const match = phone.replace(/[\s-]/g, '').match(phoneRegExp)
      if (match) {
        phone = match[1]
      } else {
        const error = new Error("Phone number not valid")
        error.statusCode = 400;
        throw error;
      }

      const userByPhone = await User.findOne({
        phone
      });
      //? The phone number will not be there until registered
      if (userByPhone && String(userByPhone._id) !== String(userById._id)) {
        const error = new Error("This phone is already registered with us");
        error.statusCode = 409;
        throw error;
      }
    }

    const updatedUser = await User.findOneAndUpdate({
      _id: _id
    }, {
      $set: {
        role: role,
        college: college ?? '',
        company: company ?? '',
        phone: phone ?? '',
      }
    }, {
      new: true
    });

    return updatedUser;
  } catch (e) {
    console.log(e)
    if (e.statusCode) throw e;
    const error = new Error("Internal Server Error");
    error.statusCode = 500;
    throw error;
  }
}

export async function loginUser({
  email,
  password
}) {
  if (!emailSchema.safeParse(email).success) {
    const error = new Error("Email not valid")
    error.statusCode = 400;
    throw error;
  }
  email = emailSchema.parse(email)
  const loggedInTimes = await redisClient.incr(`login:${email}`)
  if (loggedInTimes === 1) {
    await redisClient.expire(`login:${email}`, 600)
  }
  if (loggedInTimes > 10) {
    const error = new Error("Too many requests, please try again later");
    error.statusCode = 429;
    throw error
  }


  const user = await User.findOne({
    email: email.toLowerCase()
  });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (!user.password) {
    const error = new Error("Please log in using Google");
    error.statusCode = 400;
    throw error;
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({
    userId: user._id,
    email: user.email,
    role: user.role,
  });

  const userObj = user.toObject();
  delete userObj.password;

  return {
    user: userObj,
    token
  };
}

export async function updatePassword({otp,email, password}){
  const user = await User.findOne({email: email})
  if(!user){
    const error = new Error("User not found")
    error.statusCode= 401
    throw error
  }
  const isOTPValid = await verifyOTPForRegisteredUsers({email, otp})

  if(!isOTPValid){
    throw Error("Invalid OTP entered")
  }

  await User.findByIdAndUpdate(user._id, {password: await hashPassword(password)})

}