
import React, { useState } from "react";
import { BlurBackground } from "@/components/ui/BlurBackground";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, Phone, Mail, ChevronRight, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Client {
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
const sampleClients: Client[] = [
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

// Get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

// Get status color
const getStatusColor = (status: Client['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-amber-100 text-amber-700';
    case 'completed':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter clients based on search query
  const filteredClients = sampleClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  return (
    <PageTransition>
      <BlurBackground />
      <Navbar />
      <main className="pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Clients</h1>
              <p className="text-muted-foreground">Manage your client relationships</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full">
                  <Plus className="mr-2 h-4 w-4" />
                  New Client
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-3">
                    <Label htmlFor="clientName">Full Name</Label>
                    <Input id="clientName" placeholder="Enter client's full name" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="client@example.com" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="0400 000 000" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="loanType">Loan Type</Label>
                    <Input id="loanType" placeholder="Home Loan, Refinance, etc." />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="loanAmount">Loan Amount</Label>
                    <Input id="loanAmount" type="number" placeholder="Estimated loan amount" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" placeholder="Any additional details about this client" />
                  </div>
                  <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                    Add Client
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search clients by name, email or phone..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Clients Grid */}
          {filteredClients.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
              {filteredClients.map((client) => (
                <DashboardCard 
                  key={client.id}
                  className="hover:border-primary cursor-pointer transition-all"
                  onClick={() => setSelectedClient(client)}
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">{client.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3 truncate">
                        {client.loanType} {client.loanAmount && `- $${client.loanAmount.toLocaleString()}`}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm gap-2">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="truncate">{client.email}</span>
                        </div>
                        <div className="flex items-center text-sm gap-2">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{client.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DashboardCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No clients found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or add a new client.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Client
              </Button>
            </div>
          )}
        </div>
      </main>
      
      {/* Selected Client Dialog */}
      {selectedClient && (
        <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Client Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {getInitials(selectedClient.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-medium">{selectedClient.name}</h2>
                  <div className="mt-1">
                    <span className={`inline-flex px-2 py-0.5 text-xs rounded-full ${getStatusColor(selectedClient.status)}`}>
                      {selectedClient.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p className="text-base">{selectedClient.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                  <p className="text-base">{selectedClient.phone}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Loan Type</h3>
                  <p className="text-base">{selectedClient.loanType || "-"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
                  <p className="text-base">
                    {selectedClient.loanAmount ? 
                      `$${selectedClient.loanAmount.toLocaleString()}` : 
                      "-"}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Contact</h3>
                <p className="text-base">{selectedClient.lastContact || "-"}</p>
              </div>
              
              {selectedClient.notes && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                  <p className="text-base">{selectedClient.notes}</p>
                </div>
              )}
              
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setSelectedClient(null)}>
                  Close
                </Button>
                <Button>Edit Client</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </PageTransition>
  );
};

export default Clients;
