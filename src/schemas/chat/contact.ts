import { z } from "zod";

export const contactSellerSchema = z.object({
  content: z.string().max(250, "Maximum 250 characters are allowed"),
  phone_number: z
    .string()
    .max(10, { error: "Phone number can not exceed 10 digits" })
    .min(10, { error: "Please enter a valid phone number" }),
});

export type ContactSellerForm = z.infer<typeof contactSellerSchema>;
