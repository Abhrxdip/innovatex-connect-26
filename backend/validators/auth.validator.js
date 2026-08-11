import {
  z
} from "zod";
import {
  REGISTRATIONROLES,
  AUTH_PROVIDERS
} from "../config/constants.js";

const optionalSocialLink = () =>
  z.preprocess((value) => {
    if (value === "") {
      return undefined;
    }
    return value;
  }, z.string().trim().optional());

const githubUrlSchema = optionalSocialLink();

const linkedinUrlSchema = optionalSocialLink();

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().optional(),
  role: z.enum(Object.values(REGISTRATIONROLES)).optional(),
  college: z.string().optional(),
  company: z.string().optional(),
  phone: z.string(),
  github: githubUrlSchema,
  linkedin: linkedinUrlSchema,
  provider: z.enum(Object.values(AUTH_PROVIDERS)).optional(),
  auth_provider: z.enum(Object.values(AUTH_PROVIDERS)).optional(),
  otp: z.string().optional(),
  referralCode: z.string().optional(),
  foodPreference: z.enum(["Veg", "Non-Veg", ""]).optional(),
  bringingLaptop: z.boolean().optional(),
  website: z.string().optional(),
  avatar: z.string().optional(),
}).superRefine((data, ctx) => {
  const registrationProvider = data.auth_provider || data.provider || AUTH_PROVIDERS.MANUAL;

  if (registrationProvider !== AUTH_PROVIDERS.GOOGLE) {
    if (!data.password || data.password.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must be at least 6 characters",
      });
    }

    if (!data.otp || data.otp.length !== 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otp"],
        message: "OTP must be a 6 digit code",
      });
    }


    if (data.role === REGISTRATIONROLES.COMMUNITY_PARTNER) {
      if (!data.company) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["company"],
          message: "Company cannot be left blank"
        })
      }
      if (!data.linkedin) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["linkedin"],
        })
      }
    }
    if (data.role === REGISTRATIONROLES.STUDENT) {
      if (!data.college) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["college"],
          message: "College cannot be left blank"
        })
      }
      if (!data.linkedin) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["linkedin"],
          message: "Linkedin URL must be present"
        })
      }

      if (!data.github) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["github"],
          message: "Github URL must be present"
        })
      }

      if (!data.bringingLaptop) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["github"],
          message: "Laptop is required"
        })
      }
      if (!data.foodPreference) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["foodPreference"],
          message: "Food Preference is required"
        })
      }
    }
  }

  if (data.role === REGISTRATIONROLES.WORKING_PROFESSIONAL) {
    if (!data.company) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["company"],
        message: "Company cannot be left blank"
      })
    }
    if (!data.linkedin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["linkedin"],
        message: "Linkedin URL must be present"
      })
    }

    if (!data.github) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["github"],
        message: "Github URL must be present"
      })
    }

    if (!data.bringingLaptop) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["github"],
        message: "Laptop is required"
      })
    }
    if (!data.foodPreference) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["foodPreference"],
        message: "Food Preference is required"
      })
    }
  }


  if (data.role === REGISTRATIONROLES.COMMUNITY_PARTNER) {
      if (!data.company) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["company"],
        message: "Company cannot be left blank"
      })
    }
    if (!data.linkedin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["linkedin"],
        message: "Linkedin URL must be present"
      })
    }
  }




});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const twoFARegSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address"),
})

export const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  conf_password: z.string().min(6, "Confirm Password must be at least 6 characters"),
  otp: z.string().length(6, "OTP must be 6 digits"),
}).superRefine((data, ctx) => {
  if (data.password !== data.conf_password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      message: "Password and Confirm Password do not match"
    })
  }
})