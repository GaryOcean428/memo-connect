
import React from "react";
import { EmbeddableReferralForm } from "@/components/referrals/EmbeddableReferralForm";
import { Toaster } from "@/components/ui/toaster";

const ReferralEmbedStandalone = () => {
  // Get the recipient from the URL
  const params = new URLSearchParams(window.location.search);
  const recipientEmail = params.get('recipient') || '';

  return (
    <div className="p-4 max-w-xl mx-auto">
      <EmbeddableReferralForm 
        recipientEmail={recipientEmail} 
        onSuccess={() => {
          // Clear the form and show a success message
          const successElement = document.createElement('div');
          successElement.className = 'bg-green-50 text-green-700 p-4 rounded-lg mt-4';
          successElement.innerText = 'Thank you! Your referral has been submitted successfully.';
          
          const formContainer = document.querySelector('.form-container');
          if (formContainer) {
            formContainer.innerHTML = '';
            formContainer.appendChild(successElement);
          }
        }}
      />
      <Toaster />
    </div>
  );
};

export default ReferralEmbedStandalone;
