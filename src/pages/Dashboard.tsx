
import React, { useState } from "react";
import { BlurBackground } from "@/components/ui/BlurBackground";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ReferralCard, Referral } from "@/components/referrals/ReferralCard";
import { FileText, Users, DollarSign, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Sample data
const sampleReferrals: Referral[] = [
  {
    id: "ref-001",
    clientName: "James Wilson",
    source: "Sarah Johnson (Realtor)",
    status: "new",
    date: "May 12, 2023",
    value: 450000,
  },
  {
    id: "ref-002",
    clientName: "Emily Rodriguez",
    source: "Past Client Referral",
    status: "contacted",
    date: "May 10, 2023",
    value: 380000,
  },
  {
    id: "ref-003",
    clientName: "Michael Chen",
    source: "Website Inquiry",
    status: "in-progress",
    date: "May 5, 2023",
    value: 520000,
  },
];

const recentActivities = [
  {
    id: "act-001",
    type: "referral" as const,
    title: "New Referral Received",
    description: "James Wilson from Sarah Johnson",
    date: "2 hours ago",
  },
  {
    id: "act-002",
    type: "client" as const,
    title: "Client Status Updated",
    description: "Emily Rodriguez - Application Submitted",
    date: "4 hours ago",
  },
  {
    id: "act-003",
    type: "commission" as const,
    title: "Commission Received",
    description: "$3,500 - Michael Chen Home Loan",
    date: "Yesterday",
  },
  {
    id: "act-004",
    type: "referral" as const,
    title: "New Referral Received",
    description: "Robert Davis from Tom Williams",
    date: "2 days ago",
  },
  {
    id: "act-005",
    type: "client" as const,
    title: "Client Status Updated",
    description: "Lisa Zhang - Loan Approved",
    date: "2 days ago",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  return (
    <PageTransition>
      <BlurBackground />
      <Navbar />
      <main className="pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back to your broker portal</p>
            </div>
            <Button 
              onClick={() => navigate("/referrals")}
              className="rounded-full"
            >
              New Referral
            </Button>
          </div>

          {/* Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
            <MetricCard
              title="Total Referrals"
              value="28"
              icon={FileText}
              trend={{ value: 12, isPositive: true }}
            />
            <MetricCard
              title="Active Clients"
              value="16"
              icon={Users}
              trend={{ value: 7, isPositive: true }}
            />
            <MetricCard
              title="Monthly Revenue"
              value="$24,850"
              icon={DollarSign}
              trend={{ value: 5, isPositive: true }}
            />
            <MetricCard
              title="Conversion Rate"
              value="68%"
              icon={BarChart3}
              trend={{ value: 3, isPositive: true }}
            />
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Recent Referrals */}
            <div className="lg:col-span-3 space-y-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Recent Referrals</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/referrals")}
                >
                  View All
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleReferrals.map((referral) => (
                  <ReferralCard
                    key={referral.id}
                    referral={referral}
                    onClick={() => setSelectedReferral(referral)}
                  />
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <RecentActivity activities={recentActivities} />
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Dashboard;
