
import React, { useState } from "react";
import { useFinanceArrangements } from "@/hooks/use-finance-arrangements";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { PlusCircle, Search } from "lucide-react";
import { AddArrangementForm } from "./AddArrangementForm";
import { ArrangementDetails } from "./ArrangementDetails";
import { FinanceArrangement } from "@/types/finance";

export const FinanceArrangementsTab = () => {
  const { financeArrangements, isLoading } = useFinanceArrangements();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArrangement, setSelectedArrangement] = useState<FinanceArrangement | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter arrangements based on search
  const filteredArrangements = financeArrangements.filter(arrangement => {
    const clientName = arrangement.client_name || arrangement.referral?.clientName || "";
    const lender = arrangement.lender || "";
    const loanType = arrangement.loan_type || "";
    const searchLower = searchQuery.toLowerCase();
    
    return (
      clientName.toLowerCase().includes(searchLower) ||
      lender.toLowerCase().includes(searchLower) ||
      loanType.toLowerCase().includes(searchLower)
    );
  });

  // Render loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search arrangements..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="shrink-0"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Arrangement
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Lender</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Application Date</TableHead>
                  <TableHead>Settlement Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArrangements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No finance arrangements found. Add one to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredArrangements.map((arrangement) => (
                    <TableRow 
                      key={arrangement.id}
                      onClick={() => setSelectedArrangement(arrangement)}
                      className="cursor-pointer hover:bg-accent/40"
                    >
                      <TableCell>
                        {arrangement.client_name || arrangement.referral?.clientName || "N/A"}
                      </TableCell>
                      <TableCell>{arrangement.loan_type || "N/A"}</TableCell>
                      <TableCell>{arrangement.lender || "N/A"}</TableCell>
                      <TableCell className="text-right">
                        {arrangement.loan_amount 
                          ? `$${arrangement.loan_amount.toLocaleString()}` 
                          : "N/A"}
                      </TableCell>
                      <TableCell className="capitalize">{arrangement.status}</TableCell>
                      <TableCell>
                        {arrangement.application_date 
                          ? new Date(arrangement.application_date).toLocaleDateString() 
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {arrangement.settlement_date 
                          ? new Date(arrangement.settlement_date).toLocaleDateString() 
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Add Arrangement Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Finance Arrangement</DialogTitle>
          </DialogHeader>
          <AddArrangementForm onClose={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Arrangement Details Dialog */}
      <Dialog open={!!selectedArrangement} onOpenChange={() => setSelectedArrangement(null)}>
        {selectedArrangement && (
          <ArrangementDetails 
            arrangement={selectedArrangement}
            onClose={() => setSelectedArrangement(null)}
          />
        )}
      </Dialog>
    </>
  );
};
