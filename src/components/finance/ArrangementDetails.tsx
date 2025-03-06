
import React, { useState } from "react";
import { useFinanceArrangements } from "@/hooks/use-finance-arrangements";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { FinanceArrangement } from "@/types/finance";
import { ArrangementEditForm } from "./ArrangementEditForm";
import { CommissionsPanel } from "./CommissionsPanel";
import { format } from "date-fns";

interface ArrangementDetailsProps {
  arrangement: FinanceArrangement;
  onClose: () => void;
}

export const ArrangementDetails: React.FC<ArrangementDetailsProps> = ({ 
  arrangement, 
  onClose 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteFinanceArrangement } = useFinanceArrangements();
  const [activeTab, setActiveTab] = useState("details");

  const handleDelete = async () => {
    try {
      await deleteFinanceArrangement(arrangement.id);
      onClose();
    } catch (error) {
      console.error("Failed to delete arrangement:", error);
    }
  };

  if (isEditing) {
    return (
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Finance Arrangement</DialogTitle>
        </DialogHeader>
        <ArrangementEditForm 
          arrangement={arrangement}
          onClose={() => setIsEditing(false)}
        />
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Finance Arrangement Details</DialogTitle>
      </DialogHeader>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
              <p className="text-base break-words">
                {arrangement.client_name || arrangement.referral?.client_name || "N/A"}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <p className="text-base capitalize break-words">{arrangement.status}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Loan Type</h3>
              <p className="text-base break-words">{arrangement.loan_type || "N/A"}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Lender</h3>
              <p className="text-base break-words">{arrangement.lender || "N/A"}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
              <p className="text-base break-words">
                {arrangement.loan_amount 
                  ? `$${arrangement.loan_amount.toLocaleString()}` 
                  : "N/A"}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Application Date</h3>
              <p className="text-base break-words">
                {arrangement.application_date 
                  ? format(new Date(arrangement.application_date), "PPP") 
                  : "N/A"}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Settlement Date</h3>
              <p className="text-base break-words">
                {arrangement.settlement_date 
                  ? format(new Date(arrangement.settlement_date), "PPP") 
                  : "N/A"}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
              <p className="text-base break-words">
                {format(new Date(arrangement.created_at), "PPP")}
              </p>
            </div>
          </div>
          
          {arrangement.notes && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
              <p className="text-base break-words whitespace-pre-wrap mt-1">{arrangement.notes}</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="commissions">
          <CommissionsPanel arrangementId={arrangement.id} />
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap justify-end gap-3 pt-4 mt-4 border-t">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this finance arrangement
                and any associated commissions.
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
