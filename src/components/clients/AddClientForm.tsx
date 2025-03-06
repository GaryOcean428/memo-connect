
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddClientFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddClientForm: React.FC<AddClientFormProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <Plus className="mr-2 h-4 w-4" />
          New Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label htmlFor="clientName">Full Name</Label>
            <Input id="clientName" placeholder="Enter client's full name" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="client@example.com" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="0400 000 000" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="loanType">Loan Type</Label>
            <Input id="loanType" placeholder="Home Loan, Refinance, etc." />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="loanAmount">Loan Amount</Label>
            <Input id="loanAmount" type="number" placeholder="Estimated loan amount" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="notes">Notes</Label>
            <Input id="notes" placeholder="Any additional details about this client" />
          </div>
          <Button type="submit" onClick={() => onOpenChange(false)}>
            Add Client
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
