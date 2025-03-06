
import React, { useState } from "react";
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useIncentives } from "@/hooks/use-incentives";
import { Incentive } from "@/types/finance";
import { formatDate } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { EditIncentiveForm } from "./EditIncentiveForm";

interface IncentiveDetailsProps {
  incentive: Incentive;
  onClose: () => void;
}

export const IncentiveDetails: React.FC<IncentiveDetailsProps> = ({ incentive, onClose }) => {
  const { deleteIncentive } = useIncentives();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteIncentive(incentive.id);
    onClose();
  };

  if (isEditing) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Incentive</DialogTitle>
        </DialogHeader>
        <EditIncentiveForm 
          incentive={incentive} 
          onClose={() => setIsEditing(false)} 
        />
      </DialogContent>
    );
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Incentive Details</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-1">Type</h3>
          <p>{incentive.type || "N/A"}</p>
        </div>
        
        <div>
          <h3 className="font-medium mb-1">Amount</h3>
          <p>${incentive.amount?.toLocaleString() || "0"}</p>
        </div>

        <div>
          <h3 className="font-medium mb-1">Status</h3>
          <p className="capitalize">{incentive.status}</p>
        </div>
        
        {incentive.delivery_date && (
          <div>
            <h3 className="font-medium mb-1">Delivery Date</h3>
            <p>{formatDate(incentive.delivery_date)}</p>
          </div>
        )}

        {(incentive.client_name || incentive.referral) && (
          <>
            <Separator />
            <div>
              <h3 className="font-medium mb-1">Associated With</h3>
              {incentive.client_name && (
                <p>Client: {incentive.client_name}</p>
              )}
              {incentive.referral && (
                <p>Referral: {incentive.referral.clientName}</p>
              )}
            </div>
          </>
        )}
        
        {incentive.notes && (
          <div>
            <h3 className="font-medium mb-1">Notes</h3>
            <p className="text-sm whitespace-pre-wrap">{incentive.notes}</p>
          </div>
        )}

        <div>
          <h3 className="font-medium mb-1">Created</h3>
          <p className="text-sm text-muted-foreground">
            {formatDate(incentive.created_at)}
          </p>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </Button>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this incentive. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContent>
  );
};
