
import React, { useState, useEffect } from "react";
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
import { useReferrals } from "@/hooks/use-referrals";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InfoIcon } from "lucide-react";
import { ReferralsDashboard } from "@/components/referrals/ReferralsDashboard";
import { Toaster } from "@/components/ui/toaster";

const Referrals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"grid" | "list" | "dashboard">("grid");
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  const { referrals, isLoading, error } = useReferrals();

  // Check if we're in demo mode based on the first referral ID
  useEffect(() => {
    if (referrals.length > 0 && referrals[0].id.toString().startsWith('demo-')) {
      setIsDemoMode(true);
    }
  }, [referrals]);

  // Filter referrals based on search query and status
  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = 
      referral.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      referral.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (referral.notes && referral.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesStatus = statusFilter === "all" || referral.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenAddDialog = (open: boolean) => {
    setIsAddDialogOpen(open);
  };

  const handleSelectReferral = (referral: Referral) => {
    setSelectedReferral(referral);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <>
        {isDemoMode && (
          <Alert className="mb-6 bg-blue-50 text-blue-800 border-blue-200">
            <InfoIcon className="h-4 w-4 text-blue-600" />
            <AlertTitle>Demo Mode Active</AlertTitle>
            <AlertDescription>
              You're currently viewing sample data. Changes made in demo mode won't be saved to the database.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="mb-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
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
          
          {/* Dashboard View */}
          <TabsContent value="dashboard" className="mt-6">
            <ReferralsDashboard referrals={referrals} />
          </TabsContent>
        </Tabs>
      </>
    );
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

          {renderContent()}
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
      
      <Toaster />
    </PageTransition>
  );
};

export default Referrals;
