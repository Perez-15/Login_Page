import { z } from "zod";

export const loginSchema = z.object({

  username: z.string()
    .trim()
    .min(1, "Username is required"),

  password: z.string()
    .trim()
    .min(6, "Password must be at least 6 characters"),

  turnstileToken: z.string()
    .min(1, "Verification required")

});

export type LoginForm = z.infer<typeof loginSchema>;