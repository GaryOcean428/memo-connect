
import React from "react";
import { 
  HoverCard, 
  HoverCardContent, 
  HoverCardTrigger 
} from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";

interface LenderCommissionRate {
  lenderName: string;
  upfrontRate: number;
  trailRate: number;
}

interface CommissionRateDisplayProps {
  lender: string;
  loanAmount: number;
  commissionRates: LenderCommissionRate[];
}

export const CommissionRateDisplay: React.FC<CommissionRateDisplayProps> = ({
  lender,
  loanAmount,
  commissionRates
}) => {
  // Find the commission rate for the selected lender
  const lenderRate = commissionRates.find(rate => rate.lenderName.toLowerCase() === lender.toLowerCase());
  
  // Calculate commission amounts
  const upfrontCommission = lenderRate ? (lenderRate.upfrontRate / 100) * loanAmount : 0;
  const trailCommission = lenderRate ? (lenderRate.trailRate / 100) * loanAmount : 0;
  
  return (
    <div className="rounded-md border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Expected Commission</h3>
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="inline-flex items-center text-muted-foreground hover:text-foreground" aria-label="Commission information">
              <InfoIcon className="h-4 w-4" />
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">How commissions are calculated</h4>
              <p className="text-sm">
                Commissions are calculated based on the loan amount and the rates provided by each lender. 
                Upfront commission is paid upon settlement, while trail commissions are paid over the loan's lifetime.
              </p>
              <div className="text-xs text-muted-foreground">
                Note: Actual commission amounts may vary based on lender policies and loan specifics.
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      
      {lenderRate ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-primary/5 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Upfront ({lenderRate.upfrontRate}%)</div>
            <div className="text-lg font-semibold">${upfrontCommission.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          </div>
          <div className="bg-primary/5 p-3 rounded-md">
            <div className="text-sm text-muted-foreground">Trail ({lenderRate.trailRate}%)</div>
            <div className="text-lg font-semibold">${trailCommission.toLocaleString(undefined, { maximumFractionDigits: 2 })}/year</div>
          </div>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          No commission rates available for {lender}. Please update the lender or contact your administrator.
        </div>
      )}
    </div>
  );
};
