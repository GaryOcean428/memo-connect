
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ReferralFormValues } from "../schemas/referralFormSchema";
import { ContactSelector } from "./ContactSelector";
import { Contact } from "@/hooks/use-contacts";

interface ClientInfoFieldsProps {
  form: UseFormReturn<ReferralFormValues>;
}

export const ClientInfoFields: React.FC<ClientInfoFieldsProps> = ({ form }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleContactSelect = (contact: Contact | null) => {
    setSelectedContact(contact);
    if (contact) {
      form.setValue("sourceContactId", contact.id);
    } else {
      form.setValue("sourceContactId", undefined);
    }
  };

  return (
    <div className="space-y-4">
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
                <ContactSelector 
                  value={field.value}
                  onValueChange={field.onChange}
                  onContactSelect={handleContactSelect}
                  placeholder="Select or type a referral source"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="clientType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Client Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select client type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="personal">Personal Loan</SelectItem>
                <SelectItem value="asset">Asset Finance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
