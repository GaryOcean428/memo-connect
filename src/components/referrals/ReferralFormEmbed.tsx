
import React from "react";
import { EmbeddableReferralForm } from "./EmbeddableReferralForm";

interface ReferralFormEmbedProps {
  recipientEmail?: string;
  className?: string;
}

export const ReferralFormEmbed: React.FC<ReferralFormEmbedProps> = ({
  recipientEmail,
  className
}) => {
  return (
    <div className={className}>
      <EmbeddableReferralForm 
        recipientEmail={recipientEmail} 
        onSuccess={() => {
          console.log('Referral submitted successfully');
        }}
        onError={(error) => {
          console.error('Error submitting referral:', error);
        }}
      />
    </div>
  );
};

export default ReferralFormEmbed;
