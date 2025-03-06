
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
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";

interface AddArrangementFormProps {
  onClose: () => void;
}

// Define Zod schema for form validation
const arrangementFormSchema = z.object({
  client_id: z.string().min(1, "Client is required"),
  referral_id: z.string().optional(),
  loan_amount: z.coerce.number().optional(),
  loan_type: z.string().optional(),
  lender: z.string().optional(),
  application_date: z.date().optional(),
  settlement_date: z.date().optional(),
  status: z.enum(["inquiry", "applied", "approved", "settled", "declined"]),
  notes: z.string().optional(),
});

type ArrangementFormValues = z.infer<typeof arrangementFormSchema>;

export const AddArrangementForm: React.FC<AddArrangementFormProps> = ({ onClose }) => {
  const { addFinanceArrangement } = useFinanceArrangements();
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
  const [referrals, setReferrals] = useState<{ id: string; client_name: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<ArrangementFormValues>({
    resolver: zodResolver(arrangementFormSchema),
    defaultValues: {
      client_id: "",
      loan_type: "",
      lender: "",
      status: "inquiry",
      notes: "",
    },
  });

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name')
        .order('name');
      
      if (error) {
        console.error('Error fetching clients:', error);
        return;
      }
      
      setClients(data || []);
    };

    fetchClients();
  }, []);

  // Fetch referrals
  useEffect(() => {
    const fetchReferrals = async () => {
      const { data, error } = await supabase
        .from('referrals')
        .select('id, client_name')
        .order('client_name');
      
      if (error) {
        console.error('Error fetching referrals:', error);
        return;
      }
      
      setReferrals(data || []);
    };

    fetchReferrals();
  }, []);

  const onSubmit = async (values: ArrangementFormValues) => {
    setIsSubmitting(true);
    
    try {
      await addFinanceArrangement({
        client_id: values.client_id,
        referral_id: values.referral_id || undefined,
        loan_amount: values.loan_amount,
        loan_type: values.loan_type,
        lender: values.lender,
        application_date: values.application_date?.toISOString(),
        settlement_date: values.settlement_date?.toISOString(),
        status: values.status,
        notes: values.notes,
      });
      
      onClose();
    } catch (error) {
      console.error("Failed to add finance arrangement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 py-4">
        {/* Client Selection */}
        <FormField
          control={form.control}
          name="client_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between w-full",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? clients.find((client) => client.id === field.value)?.name
                        : "Select client"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full" align="start">
                  <Command>
                    <CommandInput placeholder="Search clients..." />
                    <CommandList>
                      <CommandEmpty>No clients found.</CommandEmpty>
                      <CommandGroup>
                        {clients.map((client) => (
                          <CommandItem
                            key={client.id}
                            value={client.name}
                            onSelect={() => {
                              form.setValue("client_id", client.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                client.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {client.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Referral Selection */}
        <FormField
          control={form.control}
          name="referral_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referral (Optional)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between w-full",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? referrals.find((referral) => referral.id === field.value)?.client_name
                        : "Select referral"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full" align="start">
                  <Command>
                    <CommandInput placeholder="Search referrals..." />
                    <CommandList>
                      <CommandEmpty>No referrals found.</CommandEmpty>
                      <CommandGroup>
                        {referrals.map((referral) => (
                          <CommandItem
                            key={referral.id}
                            value={referral.client_name}
                            onSelect={() => {
                              form.setValue("referral_id", referral.id);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                referral.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {referral.client_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

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
            {isSubmitting ? "Saving..." : "Save Arrangement"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
