
import React, { useState } from "react";
import { useCommissions } from "@/hooks/use-commissions";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { AddCommissionForm } from "./AddCommissionForm";
import { Commission } from "@/types/finance";
import { CommissionDetails } from "./CommissionDetails";
import { format } from "date-fns";

export const CommissionsTab: React.FC = () => {
  const { commissions, isLoading } = useCommissions();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Commissions</h2>
            <p className="text-muted-foreground">Manage your commission earnings</p>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Commissions</h2>
          <p className="text-muted-foreground">Manage your commission earnings</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          Add Commission
        </Button>
      </div>

      {commissions.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="mb-2 text-muted-foreground">No commissions found</p>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(true)}>
              Add your first commission
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {commissions.map((commission) => (
            <Card 
              key={commission.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedCommission(commission)}
            >
              <CardContent className="pt-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="font-medium text-lg mb-1">
                      ${commission.upfront_amount?.toLocaleString() || 0}
                      {commission.trail_percentage && (
                        <span className="text-sm text-muted-foreground ml-2">
                          + {commission.trail_percentage}% trail
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground capitalize">
                      Status: {commission.status}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {commission.finance_arrangement?.loan_type || 'N/A'} 
                      {commission.finance_arrangement?.lender && ` - ${commission.finance_arrangement.lender}`}
                    </p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {commission.upfront_payment_date && (
                      <p>Payment: {format(new Date(commission.upfront_payment_date), 'dd MMM yyyy')}</p>
                    )}
                    <p>Added: {format(new Date(commission.created_at), 'dd MMM yyyy')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
            arrangementId={null} 
            onClose={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Commission Details Dialog */}
      {selectedCommission && (
        <Dialog open={!!selectedCommission} onOpenChange={() => setSelectedCommission(null)}>
          <CommissionDetails 
            commission={selectedCommission}
            onClose={() => setSelectedCommission(null)}
          />
        </Dialog>
      )}
    </div>
  );
};
