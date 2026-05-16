import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  businessName: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  region: z.string().min(1, "Please select a region"),
  ghanaCardNumber: z.string().optional(),
  ghanaCardExpiry: z.string().optional(),
  services: z.array(z.string()).min(1, "Select at least one service"),
  availability: z.array(z.string()).min(1, "Select your availability"),
  bio: z.string().max(500).optional(),
  diaspora: z.boolean().default(false),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
