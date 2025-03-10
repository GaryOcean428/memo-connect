
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ReferralFormValues } from "../schemas/referralFormSchema";

interface ReferrerTypeFieldsProps {
  form: UseFormReturn<ReferralFormValues>;
}

export const ReferrerTypeFields: React.FC<ReferrerTypeFieldsProps> = ({ form }) => {
  return (
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
  );
};
