
import { Referral } from "@/components/referrals/ReferralCard";

// Mock referrals data to use when database data is not available
export const MOCK_REFERRALS = [
  {
    id: "demo-1",
    client_name: "John Smith",
    source: "Sarah Johnson",
    status: "new",
    date: new Date().toISOString(),
    value: 500000,
    notes: "Looking for a home loan with competitive rates",
    referrer_type: "client"
  },
  {
    id: "demo-2",
    client_name: "Emily Davis",
    source: "Michael Williams",
    status: "contacted",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    value: 350000,
    notes: "Interested in investment property financing",
    referrer_type: "broker"
  },
  {
    id: "demo-3",
    client_name: "Robert Johnson",
    source: "Financial Partners Inc.",
    status: "in-progress",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    value: 425000,
    notes: "Refinancing existing loan",
    referrer_type: "partner"
  },
  {
    id: "demo-4",
    client_name: "Jennifer Wilson",
    source: "David Thompson",
    status: "completed",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    value: 620000,
    notes: "First-time homebuyer",
    referrer_type: "client"
  },
  {
    id: "demo-5",
    client_name: "Christopher Lee",
    source: "Online Inquiry",
    status: "lost",
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    value: 275000,
    notes: "Chose another lender with lower rates",
    referrer_type: "other"
  }
];
