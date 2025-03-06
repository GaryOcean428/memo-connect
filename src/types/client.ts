
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "completed";
  loanType?: string;
  loanAmount?: number;
  lastContact?: string;
  notes?: string;
}

// Sample data
export const sampleClients: Client[] = [
  {
    id: "cl-001",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "0412 345 678",
    status: "active",
    loanType: "Home Loan",
    loanAmount: 450000,
    lastContact: "May 15, 2023",
    notes: "First-time buyer looking for a property in Eastern suburbs."
  },
  {
    id: "cl-002",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    phone: "0423 456 789",
    status: "pending",
    loanType: "Home Loan",
    loanAmount: 380000,
    lastContact: "May 12, 2023",
    notes: "Waiting on pre-approval from Commonwealth Bank."
  },
  {
    id: "cl-003",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "0434 567 890",
    status: "active",
    loanType: "Refinance",
    loanAmount: 520000,
    lastContact: "May 10, 2023",
    notes: "Looking to refinance investment property for better rates."
  },
  {
    id: "cl-004",
    name: "Sophia Patel",
    email: "sophia.p@example.com",
    phone: "0445 678 901",
    status: "active",
    loanType: "Investment Loan",
    loanAmount: 620000,
    lastContact: "May 8, 2023",
    notes: "Experienced investor adding to portfolio. Prefers ANZ."
  },
  {
    id: "cl-005",
    name: "Robert Davis",
    email: "robert.davis@example.com",
    phone: "0456 789 012",
    status: "completed",
    loanType: "Home Loan",
    loanAmount: 340000,
    lastContact: "April 30, 2023",
    notes: "Loan finalized with Commonwealth Bank. Settlement next week."
  },
  {
    id: "cl-006",
    name: "Lisa Zhang",
    email: "lisa.zhang@example.com",
    phone: "0467 890 123",
    status: "completed",
    loanType: "Business Loan",
    loanAmount: 490000,
    lastContact: "April 25, 2023",
    notes: "Successfully secured business loan through Westpac."
  }
];
