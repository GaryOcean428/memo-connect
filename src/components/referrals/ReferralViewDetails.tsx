
import React from "react";
import { Referral } from "./ReferralCard";
import { ReferralStatusBadge } from "./ReferralStatusBadge";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogCancel, 
  AlertDialogAction 
} from "@/components/ui/alert-dialog";

interface ReferralViewDetailsProps {
  referral: Referral;
  onClose: () => void;
  onDelete: () => Promise<void>;
  onEdit: () => void;
}

export const ReferralViewDetails: React.FC<ReferralViewDetailsProps> = ({
  referral,
  onClose,
  onDelete,
  onEdit
}) => {
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
            <ReferralStatusBadge status={referral.status} />
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
                <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit}>Edit Referral</Button>
        </div>
      </div>
    </DialogContent>
  );
};
