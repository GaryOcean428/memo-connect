
import React from "react";
import { useFinanceArrangements } from "@/hooks/use-finance-arrangements";
import { useCommissions } from "@/hooks/use-commissions";
import { useIncentives } from "@/hooks/use-incentives";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, CreditCard, Gift, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";

export const FinanceDashboard = () => {
  const { financeArrangements, isLoading: isLoadingArrangements } = useFinanceArrangements();
  const { commissions, isLoading: isLoadingCommissions } = useCommissions();
  const { incentives, isLoading: isLoadingIncentives } = useIncentives();

  // Calculate total settled loans
  const totalSettledLoans = financeArrangements
    .filter(arr => arr.status === 'settled')
    .reduce((sum, arr) => sum + (arr.loan_amount || 0), 0);

  // Calculate total commissions received
  const totalCommissionsReceived = commissions
    .filter(comm => comm.status === 'received')
    .reduce((sum, comm) => sum + (comm.upfront_amount || 0) + (comm.trail_amount || 0), 0);

  // Calculate pending commissions
  const pendingCommissions = commissions
    .filter(comm => comm.status === 'pending')
    .reduce((sum, comm) => sum + (comm.upfront_amount || 0) + (comm.trail_amount || 0), 0);

  // Calculate total incentives delivered
  const totalIncentivesDelivered = incentives
    .filter(inc => inc.status === 'delivered')
    .reduce((sum, inc) => sum + (inc.amount || 0), 0);

  const isLoading = isLoadingArrangements || isLoadingCommissions || isLoadingIncentives;

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Skeleton className="h-[168px] rounded-xl" />
        <Skeleton className="h-[168px] rounded-xl" />
        <Skeleton className="h-[168px] rounded-xl" />
        <Skeleton className="h-[168px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Settled Loans"
          value={`$${totalSettledLoans.toLocaleString()}`}
          icon={CreditCard}
          trend={{ value: financeArrangements.filter(a => a.status === 'settled').length, isPositive: true }}
        />
        <MetricCard
          title="Commissions Received"
          value={`$${totalCommissionsReceived.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: commissions.filter(c => c.status === 'received').length, isPositive: true }}
        />
        <MetricCard
          title="Pending Commissions"
          value={`$${pendingCommissions.toLocaleString()}`}
          icon={TrendingUp}
          trend={{ value: commissions.filter(c => c.status === 'pending').length, isPositive: true }}
        />
        <MetricCard
          title="Incentives Delivered"
          value={`$${totalIncentivesDelivered.toLocaleString()}`}
          icon={Gift}
          trend={{ value: incentives.filter(i => i.status === 'delivered').length, isPositive: true }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Recent Arrangements</h3>
          {financeArrangements.slice(0, 5).map(arr => (
            <div key={arr.id} className="py-2 border-b border-border last:border-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{arr.client_name || arr.referral?.client_name || 'Unknown Client'}</p>
                  <p className="text-sm text-muted-foreground">{arr.loan_type} - {arr.lender}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${arr.loan_amount?.toLocaleString() || 0}</p>
                  <p className="text-sm text-muted-foreground capitalize">{arr.status}</p>
                </div>
              </div>
            </div>
          ))}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Recent Commissions</h3>
          {commissions.slice(0, 5).map(comm => (
            <div key={comm.id} className="py-2 border-b border-border last:border-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {comm.finance_arrangement?.clients?.name || 
                     comm.finance_arrangement?.referrals?.client_name || 
                     'Unknown Client'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {comm.finance_arrangement?.loan_type} - {comm.finance_arrangement?.lender}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(comm.upfront_amount || 0).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground capitalize">{comm.status}</p>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};
