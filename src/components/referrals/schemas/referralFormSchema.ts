
import { z } from "zod";

// Define the schema for the embedded referral form
export const referralFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  source: z.string().min(1, "Referral source is required"),
  sourceContactId: z.string().optional(), // Add field for storing contact ID
  referrerType: z.enum(["broker", "client", "partner", "other"]).default("client"),
  referrerEmail: z.string().email("Valid email is required"),
  referrerPhone: z.string().optional(),
  recipientEmail: z.string().email("Recipient email is required"),
  value: z.string().optional(),
  notes: z.string().optional(),
  clientType: z.enum(["residential", "commercial", "personal", "asset", "other"]).optional(),
});

export type ReferralFormValues = z.infer<typeof referralFormSchema>;
