
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useReferrals } from "@/hooks/use-referrals";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AddReferralFormProps {
  onClose: () => void;
}

export const AddReferralForm: React.FC<AddReferralFormProps> = ({ onClose }) => {
  const [clientName, setClientName] = useState("");
  const [source, setSource] = useState("");
  const [value, setValue] = useState<string>("");
  const [status, setStatus] = useState<"new" | "contacted" | "in-progress" | "completed" | "lost">("new");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addReferral } = useReferrals();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientName || !source) {
      toast({
        title: "Missing information",
        description: "Please provide client name and referral source",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      await addReferral({
        clientName,
        source,
        status,
        value: value ? parseInt(value, 10) : undefined,
        notes: notes || undefined
      });
      
      onClose();
    } catch (error) {
      console.error("Failed to add referral:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Add New Referral</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-6 py-4">
        <div className="grid gap-3">
          <Label htmlFor="clientName">Client Name</Label>
          <Input 
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client's full name" 
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="source">Referral Source</Label>
          <Input 
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Who referred this client?" 
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="value">Estimated Value</Label>
          <Input 
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Loan amount or potential value" 
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={status} 
            onValueChange={(value) => setStatus(value as any)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional details about this referral" 
            rows={3}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Referral"}
        </Button>
      </form>
    </DialogContent>
  );
};
