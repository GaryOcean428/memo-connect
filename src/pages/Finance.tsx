
import React, { useState } from "react";
import { BlurBackground } from "@/components/ui/BlurBackground";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinanceArrangementsTab } from "@/components/finance/FinanceArrangementsTab";
import { CommissionsTab } from "@/components/finance/CommissionsTab";
import { IncentivesTab } from "@/components/finance/IncentivesTab";
import { FinanceDashboard } from "@/components/finance/FinanceDashboard";

const Finance = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <PageTransition>
      <BlurBackground />
      <Navbar />
      <main className="pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Finance</h1>
              <p className="text-muted-foreground">Manage your arrangements, commissions, and incentives</p>
            </div>
          </div>

          <Tabs 
            defaultValue="dashboard" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="arrangements">Arrangements</TabsTrigger>
              <TabsTrigger value="commissions">Commissions</TabsTrigger>
              <TabsTrigger value="incentives">Incentives</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="mt-6">
              <FinanceDashboard />
            </TabsContent>
            
            <TabsContent value="arrangements" className="mt-6">
              <FinanceArrangementsTab />
            </TabsContent>
            
            <TabsContent value="commissions" className="mt-6">
              <CommissionsTab />
            </TabsContent>
            
            <TabsContent value="incentives" className="mt-6">
              <IncentivesTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </PageTransition>
  );
};

export default Finance;
