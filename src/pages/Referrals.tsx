
import React, { useState } from "react";
import { BlurBackground } from "@/components/ui/BlurBackground";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Referral } from "@/components/referrals/ReferralCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReferralsHeader } from "@/components/referrals/ReferralsHeader";
import { ReferralsFilter } from "@/components/referrals/ReferralsFilter";
import { ReferralsGrid } from "@/components/referrals/ReferralsGrid";
import { ReferralsList } from "@/components/referrals/ReferralsList";
import { ReferralDetails } from "@/components/referrals/ReferralDetails";
import { AddReferralForm } from "@/components/referrals/AddReferralForm";
import { sampleReferrals } from "@/data/referrals";

const Referrals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter referrals based on search query and status
  const filteredReferrals = sampleReferrals.filter(referral => {
    const matchesSearch = referral.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         referral.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || referral.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAddDialog = (open: boolean) => {
    setIsAddDialogOpen(open);
  };

  const handleSelectReferral = (referral: Referral) => {
    setSelectedReferral(referral);
  };

  return (
    <PageTransition>
      <BlurBackground />
      <Navbar />
      <main className="pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ReferralsHeader 
            onOpenAddDialog={handleOpenAddDialog}
            isAddDialogOpen={isAddDialogOpen}
          />

          <ReferralsFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

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
              <ReferralsGrid 
                referrals={filteredReferrals}
                onSelectReferral={handleSelectReferral}
              />
            </TabsContent>
            
            {/* List View */}
            <TabsContent value="list" className="mt-6">
              <ReferralsList 
                referrals={filteredReferrals}
                onSelectReferral={handleSelectReferral}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Dialogs */}
      <Dialog open={isAddDialogOpen} onOpenChange={handleOpenAddDialog}>
        {isAddDialogOpen && <AddReferralForm onClose={() => setIsAddDialogOpen(false)} />}
      </Dialog>
      
      <Dialog open={!!selectedReferral} onOpenChange={() => setSelectedReferral(null)}>
        {selectedReferral && (
          <ReferralDetails 
            referral={selectedReferral}
            onClose={() => setSelectedReferral(null)}
          />
        )}
      </Dialog>
    </PageTransition>
  );
};

export default Referrals;
