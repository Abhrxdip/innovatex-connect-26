import User from "../models/User.js";
import Referral from "../models/Referral.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { ROLES, AUTH_PROVIDERS } from "../config/constants.js";

export async function registerUser({ name, email, password, role, college, company, phone, referralCode }) {
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    const error = new Error("User already exists with this email");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: role || ROLES.STUDENT,
    college: college || "",
    company: company || "",
    phone: phone || "",
    provider: AUTH_PROVIDERS.MANUAL,
  });

  if (referralCode) {
    const partner = await User.findOne({ role: ROLES.COMMUNITY_PARTNER });
    if (partner) {
      await Referral.create({
        partnerId: partner._id,
        referredUser: user._id,
        referralCode,
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

  return { user: userObj, token };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (!user.password) {
    const error = new Error("Please log in using Google OAuth");
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

  return { user: userObj, token };
}
