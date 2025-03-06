
import { Referral } from "@/components/referrals/ReferralCard";

export interface FinanceArrangement {
  id: string;
  client_id: string;
  referral_id?: string;
  loan_amount?: number;
  loan_type?: string;
  lender?: string;
  application_date?: string;
  settlement_date?: string;
  status: 'inquiry' | 'applied' | 'approved' | 'settled' | 'declined';
  notes?: string;
  created_at: string;
  updated_at: string;
  client_name?: string; // For UI display purposes
  referral?: Referral; // For UI display purposes
}

export interface Commission {
  id: string;
  finance_arrangement_id: string;
  upfront_amount?: number;
  upfront_payment_date?: string;
  trail_percentage?: number;
  trail_amount?: number;
  status: 'pending' | 'received' | 'overdue';
  notes?: string;
  created_at: string;
  updated_at: string;
  finance_arrangement?: FinanceArrangement; // For UI display purposes
}

export interface Incentive {
  id: string;
  client_id?: string;
  referral_id?: string;
  type?: string;
  amount?: number;
  delivery_date?: string;
  status: 'planned' | 'delivered' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
  client_name?: string; // For UI display purposes
  referral?: Referral; // For UI display purposes
}
