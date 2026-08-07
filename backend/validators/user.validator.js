import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  college: z.string().optional(),
  company: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
});

