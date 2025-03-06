
import { Referral } from "@/components/referrals/ReferralCard";

// Sample referrals data
export const sampleReferrals: Referral[] = [
  {
    id: "ref-001",
    clientName: "James Wilson",
    source: "Sarah Johnson (Realtor)",
    status: "new",
    date: "May 12, 2023",
    value: 450000,
    notes: "Looking for a home loan with low deposit options."
  },
  {
    id: "ref-002",
    clientName: "Emily Rodriguez",
    source: "Past Client Referral",
    status: "contacted",
    date: "May 10, 2023",
    value: 380000,
    notes: "First-time buyer, needs guidance on pre-approval process."
  },
  {
    id: "ref-003",
    clientName: "Michael Chen",
    source: "Website Inquiry",
    status: "in-progress",
    date: "May 5, 2023",
    value: 520000,
    notes: "Refinancing existing property, looking for better rates."
  },
  {
    id: "ref-004",
    clientName: "Sophia Patel",
    source: "John Miller (Accountant)",
    status: "in-progress",
    date: "April 28, 2023",
    value: 620000,
    notes: "Investment property purchase, has existing relationship with ANZ."
  },
  {
    id: "ref-005",
    clientName: "Robert Davis",
    source: "Tom Williams (Financial Advisor)",
    status: "completed",
    date: "April 15, 2023",
    value: 340000,
    notes: "Successfully secured home loan with Commonwealth Bank."
  },
  {
    id: "ref-006",
    clientName: "Lisa Zhang",
    source: "WeChat Community Group",
    status: "completed",
    date: "April 10, 2023",
    value: 490000,
    notes: "Self-employed, required specialist lender solutions."
  },
  {
    id: "ref-007",
    clientName: "David Thompson",
    source: "Google Ads Campaign",
    status: "lost",
    date: "April 5, 2023",
    value: 275000,
    notes: "Went with a different broker offering cash incentive."
  },
  {
    id: "ref-008",
    clientName: "Jessica Martinez",
    source: "Community Event",
    status: "new",
    date: "May 14, 2023",
    value: 410000,
    notes: "Interested in comparing different lender options."
  }
];
