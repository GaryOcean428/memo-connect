
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AddReferralFormProps {
  onClose: () => void;
}

export const AddReferralForm: React.FC<AddReferralFormProps> = ({ onClose }) => {
  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Add New Referral</DialogTitle>
      </DialogHeader>
      <div className="grid gap-6 py-4">
        <div className="grid gap-3">
          <Label htmlFor="clientName">Client Name</Label>
          <Input id="clientName" placeholder="Enter client's full name" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="source">Referral Source</Label>
          <Input id="source" placeholder="Who referred this client?" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="value">Estimated Value</Label>
          <Input id="value" type="number" placeholder="Loan amount or potential value" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue="new">
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
          <Input id="notes" placeholder="Any additional details about this referral" />
        </div>
        <Button type="submit" onClick={onClose}>
          Add Referral
        </Button>
      </div>
    </DialogContent>
  );
};
