
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { referralFormSchema, ReferralFormValues } from "./schemas/referralFormSchema";
import { ClientInfoFields } from "./components/ClientInfoFields";
import { ReferrerTypeFields } from "./components/ReferrerTypeFields";
import { ContactInfoFields } from "./components/ContactInfoFields";
import { useReferralSubmit } from "./hooks/useReferralSubmit";

interface EmbeddableReferralFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  recipientEmail?: string;
  className?: string;
  isSubmitting?: boolean;
  setIsSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EmbeddableReferralForm: React.FC<EmbeddableReferralFormProps> = ({ 
  onSuccess, 
  onError,
  recipientEmail = "",
  className = "",
  isSubmitting: externalIsSubmitting,
  setIsSubmitting: externalSetIsSubmitting
}) => {
  // Initialize the form with default values
  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(referralFormSchema),
    defaultValues: {
      clientName: "",
      source: "",
      referrerType: "client",
      referrerEmail: "",
      referrerPhone: "",
      recipientEmail: recipientEmail,
      value: "",
      notes: "",
    },
  });

  // Use the external submission state if provided, otherwise use the form's state
  const submissionState = externalIsSubmitting !== undefined ? externalIsSubmitting : form.formState.isSubmitting;

  // Use our custom hook for form submission
  const { submitReferral } = useReferralSubmit({
    onSuccess,
    onError,
    setIsSubmitting: externalSetIsSubmitting,
    onFormReset: () => form.reset()
  });

  const onSubmit = (values: ReferralFormValues) => {
    submitReferral(values);
  };

  return (
    <div className={`rounded-lg border bg-card p-6 shadow-sm ${className}`}>
      <h2 className="text-xl font-semibold mb-4">Submit a Referral</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <ClientInfoFields form={form} />
          <ReferrerTypeFields form={form} />
          <ContactInfoFields form={form} recipientEmail={recipientEmail} />
          
          <Button 
            type="submit" 
            className="w-full mt-2" 
            disabled={submissionState}
          >
            {submissionState ? "Submitting..." : "Submit Referral"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
