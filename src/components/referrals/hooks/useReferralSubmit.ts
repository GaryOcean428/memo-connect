
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { ReferralFormValues } from "../schemas/referralFormSchema";

interface UseReferralSubmitProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  onFormReset?: () => void;
}

export const useReferralSubmit = ({
  onSuccess,
  onError,
  setIsSubmitting,
  onFormReset,
}: UseReferralSubmitProps) => {
  const { toast } = useToast();

  const submitReferral = async (values: ReferralFormValues) => {
    // If external state management is provided, use it
    if (setIsSubmitting) {
      setIsSubmitting(true);
    }
    
    try {
      // Prepare the referral data for submission
      const referralData = {
        client_name: values.clientName,
        source: values.source,
        referrer_type: values.referrerType,
        referrer_email: values.referrerEmail,
        referrer_phone: values.referrerPhone || null,
        recipient_email: values.recipientEmail,
        value: values.value ? parseInt(values.value, 10) : null,
        notes: values.notes || null,
        client_type: values.clientType || null,
        status: "new",
        date: new Date().toISOString(),
        is_external: true
      };

      // Submit to the database directly
      const { error } = await supabase
        .from('referrals')
        .insert(referralData);

      if (error) {
        console.error("Error submitting referral:", error);
        toast({
          title: "Error",
          description: "There was a problem submitting your referral. Please try again.",
          variant: "destructive",
        });
        if (onError) onError(new Error(error.message));
        return;
      }

      // Handle success
      toast({
        title: "Referral Submitted",
        description: "Thank you! Your referral has been submitted successfully.",
      });
      
      if (onFormReset) onFormReset();
      if (onSuccess) onSuccess();
      
    } catch (error: any) {
      console.error("Failed to submit referral:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      if (onError) onError(error);
    } finally {
      // Reset the submission state if external state management is provided
      if (setIsSubmitting) {
        setIsSubmitting(false);
      }
    }
  };

  return { submitReferral };
};
