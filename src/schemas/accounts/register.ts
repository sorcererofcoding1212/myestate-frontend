import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, { error: "Password should be atleast 8 characters" }),
  first_name: z.string().min(1, { error: "This field is required" }),
  last_name: z.string().optional(),
});

export type RegisterForm = z.infer<typeof registerSchema>;

export const verifyOTPSchema = z.object({
  otp: z
    .string()
    .min(6, { error: "OTP should be atleast 6 characters long" })
    .max(6, { error: "OTP should not exceed 6 characters" }),
});

export type VerifyOTPForm = z.infer<typeof verifyOTPSchema>;
