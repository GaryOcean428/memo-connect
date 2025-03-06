
import React, { useState } from "react";
import { useCommissions } from "@/hooks/use-commissions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface AddCommissionFormProps {
  arrangementId: string;
  onClose: () => void;
}

// Define Zod schema for form validation
const commissionFormSchema = z.object({
  upfront_amount: z.coerce.number().optional(),
  upfront_payment_date: z.date().optional(),
  trail_percentage: z.coerce.number().optional(),
  trail_amount: z.coerce.number().optional(),
  status: z.enum(["pending", "received", "overdue"]),
  notes: z.string().optional(),
});

type CommissionFormValues = z.infer<typeof commissionFormSchema>;

export const AddCommissionForm: React.FC<AddCommissionFormProps> = ({ 
  arrangementId, 
  onClose 
}) => {
  const { addCommission } = useCommissions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<CommissionFormValues>({
    resolver: zodResolver(commissionFormSchema),
    defaultValues: {
      upfront_amount: undefined,
      trail_percentage: undefined,
      trail_amount: undefined,
      status: "pending",
      notes: "",
    },
  });

  const onSubmit = async (values: CommissionFormValues) => {
    setIsSubmitting(true);
    
    try {
      await addCommission({
        finance_arrangement_id: arrangementId,
        upfront_amount: values.upfront_amount,
        upfront_payment_date: values.upfront_payment_date?.toISOString(),
        trail_percentage: values.trail_percentage,
        trail_amount: values.trail_amount,
        status: values.status,
        notes: values.notes,
      });
      
      onClose();
    } catch (error) {
      console.error("Failed to add commission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Upfront Amount */}
          <FormField
            control={form.control}
            name="upfront_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upfront Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g. 5000"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upfront Payment Date */}
          <FormField
            control={form.control}
            name="upfront_payment_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Payment Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Trail Percentage */}
          <FormField
            control={form.control}
            name="trail_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trail Percentage (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g. 0.15"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Trail Amount */}
          <FormField
            control={form.control}
            name="trail_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trail Amount (first payment)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g. 100"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Status */}
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional details about this commission"
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Commission"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
