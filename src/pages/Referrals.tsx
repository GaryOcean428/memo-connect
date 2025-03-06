
import React, { useState } from "react";
import { BlurBackground } from "@/components/ui/BlurBackground";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { ReferralCard, Referral } from "@/components/referrals/ReferralCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, FileText } from "lucide-react";

// Sample data (extended)
const allReferrals: Referral[] = [
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

const Referrals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter referrals based on search query and status
  const filteredReferrals = allReferrals.filter(referral => {
    const matchesSearch = referral.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         referral.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || referral.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <PageTransition>
      <BlurBackground />
      <Navbar />
      <main className="pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Referrals</h1>
              <p className="text-muted-foreground">Track and manage all your client referrals</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-full">
                  <Plus className="mr-2 h-4 w-4" />
                  New Referral
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Referral</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-3">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input id="clientName" placeholder="Enter client's full name" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="source">Referral Source</Label>
                    <Input id="source" placeholder="Who referred this client?" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="value">Estimated Value</Label>
                    <Input id="value" type="number" placeholder="Loan amount or potential value" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="new">
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="notes">Notes</Label>
                    <Input id="notes" placeholder="Any additional details about this referral" />
                  </div>
                  <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
                    Add Referral
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search referrals..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="grid" className="mb-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">
                Showing {filteredReferrals.length} referrals
              </div>
            </div>
            
            {/* Grid View */}
            <TabsContent value="grid" className="mt-6">
              {filteredReferrals.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
                  {filteredReferrals.map((referral) => (
                    <ReferralCard
                      key={referral.id}
                      referral={referral}
                      onClick={() => setSelectedReferral(referral)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 animate-fade-in">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No referrals found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </TabsContent>
            
            {/* List View */}
            <TabsContent value="list" className="mt-6">
              {filteredReferrals.length > 0 ? (
                <div className="rounded-xl overflow-hidden border animate-fade-in">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-muted">
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Source</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {filteredReferrals.map((referral) => (
                          <tr 
                            key={referral.id} 
                            className="hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => setSelectedReferral(referral)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{referral.clientName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{referral.source}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                referral.status === "new" ? "bg-blue-100 text-blue-700" :
                                referral.status === "contacted" ? "bg-purple-100 text-purple-700" :
                                referral.status === "in-progress" ? "bg-amber-100 text-amber-700" :
                                referral.status === "completed" ? "bg-green-100 text-green-700" :
                                "bg-red-100 text-red-700"
                              }`}>
                                {referral.status.replace('-', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{referral.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {referral.value ? `$${referral.value.toLocaleString()}` : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 animate-fade-in">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No referrals found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Selected Referral Dialog */}
      {selectedReferral && (
        <Dialog open={!!selectedReferral} onOpenChange={() => setSelectedReferral(null)}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Referral Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Client Name</h3>
                <p className="text-base">{selectedReferral.clientName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Referral Source</h3>
                <p className="text-base">{selectedReferral.source}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <div className="mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    selectedReferral.status === "new" ? "bg-blue-100 text-blue-700" :
                    selectedReferral.status === "contacted" ? "bg-purple-100 text-purple-700" :
                    selectedReferral.status === "in-progress" ? "bg-amber-100 text-amber-700" :
                    selectedReferral.status === "completed" ? "bg-green-100 text-green-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {selectedReferral.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Date Received</h3>
                <p className="text-base">{selectedReferral.date}</p>
              </div>
              {selectedReferral.value && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Estimated Value</h3>
                  <p className="text-base">${selectedReferral.value.toLocaleString()}</p>
                </div>
              )}
              {selectedReferral.notes && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                  <p className="text-base">{selectedReferral.notes}</p>
                </div>
              )}
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setSelectedReferral(null)}>
                  Close
                </Button>
                <Button>Edit Referral</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </PageTransition>
  );
};

export default Referrals;
