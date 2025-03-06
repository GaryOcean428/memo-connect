
import React, { useMemo } from "react";
import { Referral } from "./ReferralCard";
import { DashboardCard } from "../dashboard/DashboardCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface ReferralsDashboardProps {
  referrals: Referral[];
}

export const ReferralsDashboard: React.FC<ReferralsDashboardProps> = ({ referrals }) => {
  // Calculate total value
  const totalValue = useMemo(() => {
    return referrals.reduce((sum, referral) => sum + (referral.value || 0), 0);
  }, [referrals]);

  // Calculate conversion rate
  const conversionRate = useMemo(() => {
    const completed = referrals.filter(r => r.status === "completed").length;
    return referrals.length > 0 ? (completed / referrals.length) * 100 : 0;
  }, [referrals]);

  // Group by status for pie chart
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "new": 0,
      "contacted": 0,
      "in-progress": 0,
      "completed": 0,
      "lost": 0
    };
    
    referrals.forEach(referral => {
      counts[referral.status]++;
    });
    
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [referrals]);

  // Monthly referrals for bar chart
  const monthlyReferrals = useMemo(() => {
    const months: Record<string, number> = {};
    
    referrals.forEach(referral => {
      const date = new Date(referral.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (!months[monthYear]) {
        months[monthYear] = 0;
      }
      
      months[monthYear]++;
    });
    
    return Object.entries(months)
      .map(([name, count]) => ({ name, count }))
      .slice(-6); // Last 6 months
  }, [referrals]);

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#9370DB', '#FFBB28', '#00C49F', '#FF8042'];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Overview Cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        <DashboardCard>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Referrals</h3>
          <p className="text-3xl font-bold">{referrals.length}</p>
        </DashboardCard>
        
        <DashboardCard>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Value</h3>
          <p className="text-3xl font-bold">${totalValue.toLocaleString()}</p>
        </DashboardCard>
        
        <DashboardCard>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Conversion Rate</h3>
          <p className="text-3xl font-bold">{conversionRate.toFixed(1)}%</p>
        </DashboardCard>
        
        <DashboardCard>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Avg Value</h3>
          <p className="text-3xl font-bold">
            ${referrals.length > 0 
              ? Math.round(totalValue / referrals.length).toLocaleString() 
              : 0}
          </p>
        </DashboardCard>
      </div>
      
      {/* Status Distribution */}
      <DashboardCard className="lg:col-span-1">
        <h3 className="text-base font-medium mb-4">Status Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusCounts}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {statusCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => [`${value} referrals`, 'Count']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>
      
      {/* Monthly Referrals */}
      <DashboardCard className="lg:col-span-1">
        <h3 className="text-base font-medium mb-4">Monthly Referrals</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyReferrals}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => [`${value} referrals`, 'Count']} />
              <Bar dataKey="count" fill="#8884d8" name="Referrals" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>
    </div>
  );
};
