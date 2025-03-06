
import React, { useState } from "react";
import { Referral } from "./ReferralCard";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useReferrals } from "@/hooks/use-referrals";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface ReferralDetailsProps {
  referral: Referral;
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

export const ReferralDetails: React.FC<ReferralDetailsProps> = ({ referral, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateReferral, deleteReferral } = useReferrals();
  
  // Initialize React Hook Form with Zod resolver
  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(referralFormSchema),
    defaultValues: {
      clientName: referral.clientName,
      source: referral.source,
      status: referral.status,
      value: referral.value?.toString() || "",
      notes: referral.notes || "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleUpdate = async (values: ReferralFormValues) => {
    try {
      await updateReferral(referral.id, {
        clientName: values.clientName,
        source: values.source,
        status: values.status,
        value: values.value ? parseInt(values.value, 10) : undefined,
        notes: values.notes || undefined
      });
      
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Failed to update referral:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReferral(referral.id);
      onClose();
    } catch (error) {
      console.error("Failed to delete referral:", error);
    }
  };

  if (isEditing) {
    return (
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Referral</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)} className="grid gap-6 py-4">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input type="number" {...field} />
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
                        <SelectValue />
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
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Referral Details</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Client Name</h3>
          <p className="text-base">{referral.clientName}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Referral Source</h3>
          <p className="text-base">{referral.source}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
          <div className="mt-1">
            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
              referral.status === "new" ? "bg-blue-100 text-blue-700" :
              referral.status === "contacted" ? "bg-purple-100 text-purple-700" :
              referral.status === "in-progress" ? "bg-amber-100 text-amber-700" :
              referral.status === "completed" ? "bg-green-100 text-green-700" :
              "bg-red-100 text-red-700"
            }`}>
              {referral.status.replace('-', ' ')}
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Date Received</h3>
          <p className="text-base">{referral.date}</p>
        </div>
        {referral.value && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Estimated Value</h3>
            <p className="text-base">${referral.value.toLocaleString()}</p>
          </div>
        )}
        {referral.notes && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
            <p className="text-base">{referral.notes}</p>
          </div>
        )}
        <div className="flex justify-end gap-3 pt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the referral for {referral.clientName}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => setIsEditing(true)}>Edit Referral</Button>
        </div>
      </div>
    </DialogContent>
  );
};
