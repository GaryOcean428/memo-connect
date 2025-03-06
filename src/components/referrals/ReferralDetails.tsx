
import React from "react";
import { Referral } from "./ReferralCard";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ReferralDetailsProps {
  referral: Referral;
  onClose: () => void;
}

export const ReferralDetails: React.FC<ReferralDetailsProps> = ({ referral, onClose }) => {
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
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Edit Referral</Button>
        </div>
      </div>
    </DialogContent>
  );
};
