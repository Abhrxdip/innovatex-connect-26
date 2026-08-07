import { z } from "zod";
import { ATTENDEE_TYPES } from "../config/constants.js";

export const bookTicketSchema = z.object({
  attendeeType: z.enum([ATTENDEE_TYPES.STUDENT, ATTENDEE_TYPES.WORKING_PROFESSIONAL]),
  college: z.string().optional(),
  company: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  phone: z.string().optional(),
});
