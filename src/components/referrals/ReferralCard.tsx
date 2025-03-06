
import React from "react";
import { DashboardCard } from "../dashboard/DashboardCard";
import { cn } from "@/lib/utils";

export interface Referral {
  id: string;
  clientName: string;
  source: string;
  status: "new" | "contacted" | "in-progress" | "completed" | "lost";
  date: string;
  value?: number;
  notes?: string;
}

const statusColors = {
  "new": "bg-blue-100 text-blue-700",
  "contacted": "bg-purple-100 text-purple-700",
  "in-progress": "bg-amber-100 text-amber-700",
  "completed": "bg-green-100 text-green-700",
  "lost": "bg-red-100 text-red-700",
};

interface ReferralCardProps {
  referral: Referral;
  onClick?: () => void;
}

export const ReferralCard: React.FC<ReferralCardProps> = ({ referral, onClick }) => {
  return (
    <DashboardCard 
      className="hover:border-primary cursor-pointer transition-all"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium truncate">{referral.clientName}</h3>
        <div className={cn("text-xs px-2 py-1 rounded-full whitespace-nowrap", statusColors[referral.status])}>
          {referral.status.replace('-', ' ')}
        </div>
      </div>
      <div className="text-sm text-muted-foreground mb-3">
        From: {referral.source}
      </div>
      {referral.value && (
        <div className="text-sm mb-2">
          Potential value: <span className="font-medium">${referral.value.toLocaleString()}</span>
        </div>
      )}
      <div className="text-xs text-muted-foreground">
        Received: {referral.date}
      </div>
    </DashboardCard>
  );
};
