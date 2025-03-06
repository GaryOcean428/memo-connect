
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Client } from "@/types/client";

interface ClientDetailsProps {
  client: Client | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

// Get status color
const getStatusColor = (status: Client['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-amber-100 text-amber-700';
    case 'completed':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const ClientDetails: React.FC<ClientDetailsProps> = ({ client, open, onOpenChange }) => {
  if (!client) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Client Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border">
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {getInitials(client.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-medium">{client.name}</h2>
              <div className="mt-1">
                <span className={`inline-flex px-2 py-0.5 text-xs rounded-full ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="text-base">{client.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
              <p className="text-base">{client.phone}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Loan Type</h3>
              <p className="text-base">{client.loanType || "-"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
              <p className="text-base">
                {client.loanAmount ? 
                  `$${client.loanAmount.toLocaleString()}` : 
                  "-"}
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Last Contact</h3>
            <p className="text-base">{client.lastContact || "-"}</p>
          </div>
          
          {client.notes && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
              <p className="text-base">{client.notes}</p>
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>Edit Client</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
