import {
  z
} from "zod";
import {
  REGISTRATIONROLES
} from "../config/constants";

const optionalSocialLink = () =>
  z.preprocess((value) => {
    if (value === "") {
      return undefined;
    }
    return value;
  }, z.string().trim().optional());

const githubUrlSchema = optionalSocialLink();

const linkedinUrlSchema = optionalSocialLink();

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