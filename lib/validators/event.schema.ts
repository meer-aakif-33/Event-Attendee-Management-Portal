// lib/validators/event.schema.ts
import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10),
  date: z
    .string()
    .refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "Invalid date",
    })
    .transform((val) => new Date(val)),
  capacity: z.coerce.number().int().positive(),
});

export type EventFormInput = z.input<typeof eventSchema>;   // date: string
export type EventInput = z.output<typeof eventSchema>;      // date: Date
