import {
  z
} from "zod";
import {
  REGISTRATIONROLES
} from "../config/constants.js";

const processUrl = (value) => {
  if (!value || value === "") return undefined;
  let v = value.trim();
  if (!v.startsWith("http://") && !v.startsWith("https://")) {
    v = "https://" + v;
  }
  try {
    const url = new URL(v);
    url.search = ""; // remove query parameters
    return url.toString();
  } catch (e) {
    return v;
  }
};




export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  college: z.string().optional(),
  company: z.string().optional(),
  github: z.string().optional(),
  role: z.enum(Object.values(REGISTRATIONROLES)),
  linkedin: z.string().optional(),
  foodPreference: z.enum(["Veg", "Non-Veg", ""]).optional(""),
  bringingLaptop: z.boolean(),
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
        message: "Linkedin URL must be present"
      })
    }
    data.linkedin = (processUrl(data.linkedin) ?? '').toLowerCase()
    if (!data.linkedin.includes("linkedin.com/in")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["linkedin"],
        message: "Linkedin URL must be a valid linkedin.com/in/your-username format"
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
    data.linkedin = (processUrl(data.linkedin) ?? '').toLowerCase()
    if (!data.linkedin.includes("linkedin.com/in")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["linkedin"],
        message: "Linkedin URL must be a valid linkedin.com/in/your-username format"
      })
    }

    if (!data.github) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["github"],
        message: "Github URL must be present"
      })
    }
    data.github = (processUrl(data.github) ?? '').toLowerCase()
    if (!data.github.includes("github.com/")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["github"],
        message: "Github URL must be a valid github.com/your-username format"
      })
    }

    if (!data.bringingLaptop) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["bringingLaptop"],
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
    data.linkedin = (processUrl(data.linkedin) ?? '').toLowerCase()
    if (!data.linkedin.includes("linkedin.com/in")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["linkedin"],
        message: "Linkedin URL must be a valid linkedin.com/in/your-username format"
      })
    }

    if (!data.github) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["github"],
        message: "Github URL must be present"
      })
    }
    data.github = (processUrl(data.github) ?? '').toLowerCase()
    if (!data.github.includes("github.com/")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["github"],
        message: "Github URL must be a valid github.com/your-username format"
      })
    }


    if (!data.bringingLaptop) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["bringingLaptop"],
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


});