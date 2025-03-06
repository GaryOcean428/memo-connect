
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useReferrals } from "@/hooks/use-referrals";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface AddReferralFormProps {
  onClose: () => void;
}

// Define Zod schema for form validation
const referralFormSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  source: z.string().min(1, "Referral source is required"),
  value: z.string().optional(),
  status: z.enum(["new", "contacted", "in-progress", "completed", "lost"]),
  notes: z.string().optional(),
});

type ReferralFormValues = z.infer<typeof referralFormSchema>;

export const AddReferralForm: React.FC<AddReferralFormProps> = ({ onClose }) => {
  const { addReferral } = useReferrals();
  const { toast } = useToast();
  
  // Initialize React Hook Form with Zod resolver
  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(referralFormSchema),
    defaultValues: {
      clientName: "",
      source: "",
      value: "",
      status: "new",
      notes: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: ReferralFormValues) => {
    try {
      await addReferral({
        clientName: values.clientName,
        source: values.source,
        status: values.status,
        value: values.value ? parseInt(values.value, 10) : undefined,
        notes: values.notes || undefined
      });
      
      onClose();
    } catch (error) {
      console.error("Failed to add referral:", error);
    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Add New Referral</DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-4">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter client's full name" 
                    {...field} 
                  />
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
                  <Input 
                    placeholder="Who referred this client?" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Value</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    placeholder="Loan amount or potential value" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any additional details about this referral" 
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Referral"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};
