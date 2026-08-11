import {
  z
} from "zod";
import {
  REGISTRATIONROLES
} from "../config/constants";

const optionalSocialLink = (message) =>
  z.preprocess((value) => {
    if (value === "") {
      return undefined;
    }
    return value;
  }, z.string().trim().url(message).optional());

const githubUrlSchema = optionalSocialLink(
  "GitHub profile must be a valid URL"
);

const linkedinUrlSchema = optionalSocialLink(
  "LinkedIn profile must be a valid URL"
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