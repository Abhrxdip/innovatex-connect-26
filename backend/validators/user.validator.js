import {
  z
} from "zod";
import {
  REGISTRATIONROLES
} from "../config/constants";

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

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  college: z.string().optional(),
  company: z.string().optional(),
  github: githubUrlSchema.optional(),
  role: z.enum(Object.values(REGISTRATIONROLES)),
  linkedin: linkedinUrlSchema,
  foodPreference: z.enum(["Veg", "Non-Veg", ""]).optional(""),
  website: z.string().optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.role !== REGISTRATIONROLES.COMMUNITY_PARTNER) {
    if (!data.github) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "GitHub profile is required",
        path: ["github"],
      });
    }
  }
});