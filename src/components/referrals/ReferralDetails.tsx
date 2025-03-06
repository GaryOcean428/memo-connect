
import React, { useState } from "react";
import { Referral } from "./ReferralCard";
import { useReferrals } from "@/hooks/use-referrals";
import { ReferralEditForm } from "./ReferralEditForm";
import { ReferralViewDetails } from "./ReferralViewDetails";

interface ReferralDetailsProps {
  referral: Referral;
  onClose: () => void;
}

export const ReferralDetails: React.FC<ReferralDetailsProps> = ({ referral, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteReferral } = useReferrals();
  
  const handleDelete = async () => {
    try {
      await deleteReferral(referral.id);
      onClose();
    } catch (error) {
      console.error("Failed to delete referral:", error);
    }
  };

  if (isEditing) {
    return (
      <ReferralEditForm
        referral={referral}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <ReferralViewDetails
      referral={referral}
      onClose={onClose}
      onDelete={handleDelete}
      onEdit={() => setIsEditing(true)}
    />
  );
};
