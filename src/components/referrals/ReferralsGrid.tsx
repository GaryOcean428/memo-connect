
import React from "react";
import { Referral, ReferralCard } from "./ReferralCard";
import { ReferralsEmptyState } from "./ReferralsEmptyState";

interface ReferralsGridProps {
  referrals: Referral[];
  onSelectReferral: (referral: Referral) => void;
}

export const ReferralsGrid: React.FC<ReferralsGridProps> = ({ referrals, onSelectReferral }) => {
  if (referrals.length === 0) {
    return <ReferralsEmptyState />;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
      {referrals.map((referral) => (
        <ReferralCard
          key={referral.id}
          referral={referral}
          onClick={() => onSelectReferral(referral)}
        />
      ))}
    </div>
  );
};
