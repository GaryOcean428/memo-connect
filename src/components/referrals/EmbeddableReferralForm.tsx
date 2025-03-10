
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

// Define the schema for the embedded referral form
const referralFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  source: z.string().min(1, "Referral source is required"),
  referrerType: z.enum(["broker", "client", "partner", "other"]).default("client"),
  referrerEmail: z.string().email("Valid email is required"),
  referrerPhone: z.string().optional(),
  recipientEmail: z.string().email("Recipient email is required"),
  value: z.string().optional(),
  notes: z.string().optional(),
});

type ReferralFormValues = z.infer<typeof referralFormSchema>;

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
  const { toast } = useToast();
  
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

  const onSubmit = async (values: ReferralFormValues) => {
    // If external state management is provided, use it
    if (externalSetIsSubmitting) {
      externalSetIsSubmitting(true);
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
      
      form.reset();
      
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
      if (externalSetIsSubmitting) {
        externalSetIsSubmitting(false);
      }
    }
  };

  return (
    <div className={`rounded-lg border bg-card p-6 shadow-sm ${className}`}>
      <h2 className="text-xl font-semibold mb-4">Submit a Referral</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Full name of the client" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referral Source</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="referrerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Relationship</FormLabel>
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your relationship" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="broker">Broker</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Value ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      placeholder="Estimated loan or opportunity value" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="referrerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your email address" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="referrerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="recipientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Email</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Email of the person you're referring to" 
                    type="email" 
                    readOnly={!!recipientEmail}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Any additional details about this referral" 
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
