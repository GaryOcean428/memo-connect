
import React from "react";
import { Referral } from "./ReferralCard";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReferralStatusBadge } from "./ReferralStatusBadge";
import { formatDate } from "@/lib/utils";
import { Calendar, DollarSign, ExternalLink, Mail, Phone, User } from "lucide-react";

interface ReferralViewDetailsProps {
  referral: Referral;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const ReferralViewDetails: React.FC<ReferralViewDetailsProps> = ({
  referral,
  onClose,
  onDelete,
  onEdit,
}) => {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this referral?")) {
      onDelete();
    }
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Referral Details</DialogTitle>
      </DialogHeader>

      <div className="py-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold">{referral.clientName}</h2>
            <p className="text-sm text-muted-foreground">From: {referral.source}</p>
          </div>
          <ReferralStatusBadge status={referral.status} />
        </div>

        {referral.isExternal && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-md flex items-center">
            <ExternalLink className="h-4 w-4 mr-2" />
            <span>This is an external referral</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Referrer Type</p>
            <p className="flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="capitalize">{referral.referrerType || "Client"}</span>
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Referral Date</p>
            <p className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              {referral.date}
            </p>
          </div>

          {referral.value && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Estimated Value</p>
              <p className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                ${referral.value.toLocaleString()}
              </p>
            </div>
          )}

          {referral.referrerEmail && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Referrer Email</p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                {referral.referrerEmail}
              </p>
            </div>
          )}

          {referral.referrerPhone && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Referrer Phone</p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                {referral.referrerPhone}
              </p>
            </div>
          )}

          {referral.recipientEmail && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Recipient Email</p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                {referral.recipientEmail}
              </p>
            </div>
          )}
        </div>

        {referral.notes && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-1">Notes</p>
            <p className="text-sm bg-muted p-3 rounded-md">{referral.notes}</p>
          </div>
        )}
      </div>

      <DialogFooter className="flex justify-between sm:justify-between">
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit}>Edit</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};
