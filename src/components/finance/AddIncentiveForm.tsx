
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useIncentives } from "@/hooks/use-incentives";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AddIncentiveFormProps {
  onClose: () => void;
}

const formSchema = z.object({
  type: z.string().min(1, { message: "Type is required" }),
  amount: z.coerce.number().min(0, { message: "Amount must be at least 0" }),
  status: z.enum(["planned", "delivered", "cancelled"]),
  delivery_date: z.date().nullable().optional(),
  notes: z.string().optional(),
  client_id: z.string().optional(),
  referral_id: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const AddIncentiveForm: React.FC<AddIncentiveFormProps> = ({ onClose }) => {
  const { addIncentive } = useIncentives();
  const [associationType, setAssociationType] = useState("none");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      amount: 0,
      status: "planned",
      delivery_date: null,
      notes: "",
      client_id: undefined,
      referral_id: undefined,
    },
  });

  const onSubmit = (data: FormValues) => {
    // Clear association fields based on the selected type
    if (associationType === "none") {
      data.client_id = undefined;
      data.referral_id = undefined;
    } else if (associationType === "client") {
      data.referral_id = undefined;
    } else if (associationType === "referral") {
      data.client_id = undefined;
    }

    addIncentive({
      ...data,
      delivery_date: data.delivery_date ? format(data.delivery_date, "yyyy-MM-dd") : null,
    });
    
    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Referral bonus, Gift" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount ($)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="delivery_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Delivery Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
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

        <div>
          <FormLabel className="block mb-2">Associate With</FormLabel>
          <Tabs defaultValue="none" value={associationType} onValueChange={setAssociationType}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="none">None</TabsTrigger>
              <TabsTrigger value="client">Client</TabsTrigger>
              <TabsTrigger value="referral">Referral</TabsTrigger>
            </TabsList>
            <TabsContent value="client" className="mt-4">
              <FormField
                control={form.control}
                name="client_id"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="placeholder">Placeholder Client</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="referral" className="mt-4">
              <FormField
                control={form.control}
                name="referral_id"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select referral" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="placeholder">Placeholder Referral</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any additional details about this incentive" 
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Incentive</Button>
        </div>
      </form>
    </Form>
  );
};
