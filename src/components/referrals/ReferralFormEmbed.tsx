
import React, { useState } from "react";
import { EmbeddableReferralForm } from "./EmbeddableReferralForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ReferralFormEmbedProps {
  recipientEmail?: string;
  className?: string;
  showHeader?: boolean;
  title?: string;
  description?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const ReferralFormEmbed: React.FC<ReferralFormEmbedProps> = ({
  recipientEmail,
  className,
  showHeader = true,
  title = "Refer a Client",
  description = "Fill out the form below to refer a client to us. We appreciate your business!",
  onSuccess,
  onError
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSuccess = () => {
    setIsSubmitting(false);
    toast({
      title: "Referral submitted",
      description: "Thank you for your referral. We'll be in touch soon!",
    });
    
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleError = (error: any) => {
    setIsSubmitting(false);
    toast({
      title: "Error submitting referral",
      description: "There was a problem submitting your referral. Please try again.",
      variant: "destructive",
    });
    
    if (onError) {
      onError(error);
    }
  };

  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <EmbeddableReferralForm 
          recipientEmail={recipientEmail} 
          onSuccess={handleSuccess}
          onError={handleError}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />
      </CardContent>
    </Card>
  );
};

export default ReferralFormEmbed;
