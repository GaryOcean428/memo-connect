
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { ReferralFormValues } from "../schemas/referralFormSchema";

interface ContactInfoFieldsProps {
  form: UseFormReturn<ReferralFormValues>;
  recipientEmail?: string;
}

export const ContactInfoFields: React.FC<ContactInfoFieldsProps> = ({ 
  form, 
  recipientEmail = "" 
}) => {
  return (
    <>
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
    </>
  );
};
