import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(9, "Phone number must be at least 9 digits"),
  countryCode: z.string().default("+233"),
});

export const otpSchema = z.object({
  phone: z.string(),
  code: z.string().length(4, "OTP must be 4 digits"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
