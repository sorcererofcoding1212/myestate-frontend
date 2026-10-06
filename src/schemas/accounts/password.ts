import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { error: "Password should be atleast 8 characters" }),
  confirm_password: z.string().min(8, { error: "Passwords do not match" }),
});

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
