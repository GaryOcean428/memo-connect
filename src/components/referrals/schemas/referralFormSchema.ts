
import { z } from "zod";

// Define the schema for the embedded referral form
export const referralFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  source: z.string().min(1, "Referral source is required"),
  referrerType: z.enum(["broker", "client", "partner", "other"]).default("client"),
  referrerEmail: z.string().email("Valid email is required"),
  referrerPhone: z.string().optional(),
  recipientEmail: z.string().email("Recipient email is required"),
  value: z.string().optional(),
  notes: z.string().optional(),
});

export type ReferralFormValues = z.infer<typeof referralFormSchema>;
