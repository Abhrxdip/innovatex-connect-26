import {
  z
} from "zod";
import {
  REGISTRATIONROLES,
  AUTH_PROVIDERS
} from "../config/constants.js";

const optionalSocialLink = (pattern, message) =>
  z.preprocess((value) => {
    if (value === "") {
      return undefined;
    }
    return value;
  }, z.string().trim().regex(pattern, message).optional());

const githubUrlSchema = optionalSocialLink(
  /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9-]+\/?$/i,
  "GitHub URL must be a valid GitHub profile link"
);

const linkedinUrlSchema = optionalSocialLink(
  /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-_%]+\/?$/i,
  "LinkedIn URL must be a valid /in/ profile link"
);

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().optional(),
  role: z.enum(Object.values(REGISTRATIONROLES)).optional(),
  college: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  github: githubUrlSchema,
  linkedin: linkedinUrlSchema,
  provider: z.enum(Object.values(AUTH_PROVIDERS)).optional(),
  auth_provider: z.enum(Object.values(AUTH_PROVIDERS)).optional(),
  otp: z.string().optional(),
  referralCode: z.string().optional(),
  foodPreference: z.boolean().optional(),
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