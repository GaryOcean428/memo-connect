
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface ReferralsHeaderProps {
  onOpenAddDialog: () => void;
  isAddDialogOpen: boolean;
}

export const ReferralsHeader: React.FC<ReferralsHeaderProps> = ({ 
  onOpenAddDialog, 
  isAddDialogOpen 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Referrals</h1>
        <p className="text-muted-foreground">Track and manage all your client referrals</p>
      </div>
      <Dialog open={isAddDialogOpen} onOpenChange={onOpenAddDialog}>
        <DialogTrigger asChild>
          <Button className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            New Referral
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
};
