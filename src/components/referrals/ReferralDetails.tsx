
import React, { useState } from "react";
import { Referral } from "./ReferralCard";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useReferrals } from "@/hooks/use-referrals";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface ReferralDetailsProps {
  referral: Referral;
  onClose: () => void;
}

export const ReferralDetails: React.FC<ReferralDetailsProps> = ({ referral, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [clientName, setClientName] = useState(referral.clientName);
  const [source, setSource] = useState(referral.source);
  const [status, setStatus] = useState(referral.status);
  const [value, setValue] = useState(referral.value?.toString() || "");
  const [notes, setNotes] = useState(referral.notes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { updateReferral, deleteReferral } = useReferrals();

  const handleUpdate = async () => {
    try {
      setIsSubmitting(true);
      
      await updateReferral(referral.id, {
        clientName,
        source,
        status,
        value: value ? parseInt(value, 10) : undefined,
        notes: notes || undefined
      });
      
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Failed to update referral:", error);
    } finally {
      setIsSubmitting(false);
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
        <div className="grid gap-6 py-4">
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
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
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
