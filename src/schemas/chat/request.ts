import { z } from "zod";

export const viewingRequestSchema = z.object({
  date: z.string(),
  time: z.string(),
  phone_number: z
    .string()
    .max(10, { error: "Phone number can not exceed 10 digits" })
    .min(10, { error: "Please enter a valid phone number" }),
});

export type ViewingRequestForm = z.infer<typeof viewingRequestSchema>;
