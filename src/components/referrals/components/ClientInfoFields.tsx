
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ReferralFormValues } from "../schemas/referralFormSchema";

interface ClientInfoFieldsProps {
  form: UseFormReturn<ReferralFormValues>;
}

export const ClientInfoFields: React.FC<ClientInfoFieldsProps> = ({ form }) => {
  return (
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
  );
};
