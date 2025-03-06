
import React, { useState, useEffect } from "react";
import { useFinanceArrangements } from "@/hooks/use-finance-arrangements";
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
import { FinanceArrangement } from "@/types/finance";

interface ArrangementEditFormProps {
  arrangement: FinanceArrangement;
  onClose: () => void;
}

// Define schema for form validation
const arrangementFormSchema = z.object({
  loan_amount: z.coerce.number().optional(),
  loan_type: z.string().optional(),
  lender: z.string().optional(),
  application_date: z.date().optional().nullable(),
  settlement_date: z.date().optional().nullable(),
  status: z.enum(["inquiry", "applied", "approved", "settled", "declined"]),
  notes: z.string().optional(),
});

type ArrangementFormValues = z.infer<typeof arrangementFormSchema>;

export const ArrangementEditForm: React.FC<ArrangementEditFormProps> = ({ arrangement, onClose }) => {
  const { updateFinanceArrangement } = useFinanceArrangements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<ArrangementFormValues>({
    resolver: zodResolver(arrangementFormSchema),
    defaultValues: {
      loan_amount: arrangement.loan_amount,
      loan_type: arrangement.loan_type || "",
      lender: arrangement.lender || "",
      application_date: arrangement.application_date ? new Date(arrangement.application_date) : null,
      settlement_date: arrangement.settlement_date ? new Date(arrangement.settlement_date) : null,
      status: arrangement.status,
      notes: arrangement.notes || "",
    },
  });

  const onSubmit = async (values: ArrangementFormValues) => {
    setIsSubmitting(true);
    
    try {
      await updateFinanceArrangement({
        id: arrangement.id,
        data: {
          loan_amount: values.loan_amount,
          loan_type: values.loan_type,
          lender: values.lender,
          application_date: values.application_date ? values.application_date.toISOString() : null,
          settlement_date: values.settlement_date ? values.settlement_date.toISOString() : null,
          status: values.status,
          notes: values.notes,
        }
      });
      
      onClose();
    } catch (error) {
      console.error("Failed to update finance arrangement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Loan Amount */}
          <FormField
            control={form.control}
            name="loan_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g. 450000"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Loan Type */}
          <FormField
            control={form.control}
            name="loan_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Mortgage, Personal Loan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Lender */}
          <FormField
            control={form.control}
            name="lender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lender</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Bank Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    <SelectItem value="inquiry">Inquiry</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="settled">Settled</SelectItem>
                    <SelectItem value="declined">Declined</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Application Date */}
          <FormField
            control={form.control}
            name="application_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Application Date</FormLabel>
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
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Settlement Date */}
          <FormField
            control={form.control}
            name="settlement_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Settlement Date</FormLabel>
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
                      selected={field.value || undefined}
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

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional details about this finance arrangement"
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
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
