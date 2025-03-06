
import React, { useState } from "react";
import { useCommissions } from "@/hooks/use-commissions";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Commission } from "@/types/finance";
import { CommissionEditForm } from "./CommissionEditForm";
import { format } from "date-fns";

interface CommissionDetailsProps {
  commission: Commission;
  onClose: () => void;
}

export const CommissionDetails: React.FC<CommissionDetailsProps> = ({ 
  commission, 
  onClose 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteCommission } = useCommissions();

  const handleDelete = async () => {
    try {
      await deleteCommission(commission.id);
      onClose();
    } catch (error) {
      console.error("Failed to delete commission:", error);
    }
  };

  if (isEditing) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Commission</DialogTitle>
        </DialogHeader>
        <CommissionEditForm 
          commission={commission}
          onClose={() => setIsEditing(false)}
        />
      </DialogContent>
    );
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Commission Details</DialogTitle>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Upfront Amount</h3>
            <p className="text-base break-words">
              {commission.upfront_amount
                ? `$${commission.upfront_amount.toLocaleString()}`
                : "N/A"}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <p className="text-base capitalize break-words">{commission.status}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Payment Date</h3>
            <p className="text-base break-words">
              {commission.upfront_payment_date
                ? format(new Date(commission.upfront_payment_date), "PPP")
                : "N/A"}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Trail Percentage</h3>
            <p className="text-base break-words">
              {commission.trail_percentage
                ? `${commission.trail_percentage}%`
                : "N/A"}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Trail Amount</h3>
            <p className="text-base break-words">
              {commission.trail_amount
                ? `$${commission.trail_amount.toLocaleString()}`
                : "N/A"}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
            <p className="text-base break-words">
              {format(new Date(commission.created_at), "PPP")}
            </p>
          </div>
        </div>
        
        {commission.notes && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
            <p className="text-base break-words whitespace-pre-wrap mt-1">{commission.notes}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-end gap-3 pt-4 mt-4 border-t">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this commission record.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-wrap gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        
        <Button onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </div>
    </DialogContent>
  );
};
