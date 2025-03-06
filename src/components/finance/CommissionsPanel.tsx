
import React, { useState } from "react";
import { useCommissions } from "@/hooks/use-commissions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { AddCommissionForm } from "./AddCommissionForm";
import { Commission } from "@/types/finance";
import { CommissionDetails } from "./CommissionDetails";

interface CommissionsPanelProps {
  arrangementId: string;
}

export const CommissionsPanel: React.FC<CommissionsPanelProps> = ({ arrangementId }) => {
  const { commissions, isLoading } = useCommissions();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);

  // Filter commissions for this arrangement
  const filteredCommissions = commissions.filter(
    comm => comm.finance_arrangement_id === arrangementId
  );

  if (isLoading) {
    return (
      <div className="space-y-4 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Commissions</h3>
          <Skeleton className="h-9 w-28" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Commissions</h3>
        <Button onClick={() => setIsAddDialogOpen(true)} size="sm">
          Add Commission
        </Button>
      </div>

      {filteredCommissions.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border rounded-lg">
          <p>No commissions found for this arrangement.</p>
          <p className="text-sm mt-1">Add a commission to track your earnings.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCommissions.map(commission => (
            <div 
              key={commission.id}
              className="border rounded-lg p-4 cursor-pointer hover:bg-accent/40 transition-colors"
              onClick={() => setSelectedCommission(commission)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Upfront: ${commission.upfront_amount?.toLocaleString() || 0}</span>
                    {commission.trail_percentage && (
                      <span className="text-sm text-muted-foreground">
                        + Trail: {commission.trail_percentage}%
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Status: <span className="capitalize">{commission.status}</span>
                  </p>
                </div>
                <div className="text-right">
                  {commission.upfront_payment_date && (
                    <p className="text-sm text-muted-foreground">
                      Payment date: {formatDate(commission.upfront_payment_date)}
                    </p>
                  )}
                </div>
              </div>
              {commission.notes && (
                <p className="text-sm text-muted-foreground line-clamp-2">{commission.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Commission Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Commission</DialogTitle>
          </DialogHeader>
          <AddCommissionForm 
            arrangementId={arrangementId} 
            onClose={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Commission Details Dialog */}
      <Dialog open={!!selectedCommission} onOpenChange={() => setSelectedCommission(null)}>
        {selectedCommission && (
          <CommissionDetails 
            commission={selectedCommission}
            onClose={() => setSelectedCommission(null)}
          />
        )}
      </Dialog>
    </div>
  );
};
