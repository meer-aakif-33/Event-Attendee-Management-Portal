// lib/validators/attendee.schema.ts
import { z } from "zod";

export const attendeeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  eventId: z.string().cuid(),
});

export type AttendeeInput = z.infer<typeof attendeeSchema>;
