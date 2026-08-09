import {
  z
} from "zod";
import {
  REGISTRATIONROLES
} from "../config/constants.js";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(Object.values(REGISTRATIONROLES)).optional(),
  college: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  github: z.string().optional(),
  otp: z.string().nonempty().length(6),
  referralCode: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const forgetPassAndtwoFARegSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address"),
})