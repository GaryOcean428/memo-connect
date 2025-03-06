
import React from "react";
import { Referral } from "./ReferralCard";
import { ReferralsEmptyState } from "./ReferralsEmptyState";

interface ReferralsListProps {
  referrals: Referral[];
  onSelectReferral: (referral: Referral) => void;
}

export const ReferralsList: React.FC<ReferralsListProps> = ({ referrals, onSelectReferral }) => {
  if (referrals.length === 0) {
    return <ReferralsEmptyState />;
  }

  return (
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
            {referrals.map((referral) => (
              <tr 
                key={referral.id} 
                className="hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onSelectReferral(referral)}
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
  );
};
