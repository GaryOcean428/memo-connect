
import React, { useState } from "react";
import { useIncentives } from "@/hooks/use-incentives";
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
import { Gift, Search } from "lucide-react";
import { AddIncentiveForm } from "./AddIncentiveForm";
import { IncentiveDetails } from "./IncentiveDetails";
import { Incentive } from "@/types/finance";

export const IncentivesTab = () => {
  const { incentives, isLoading } = useIncentives();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncentive, setSelectedIncentive] = useState<Incentive | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter incentives based on search
  const filteredIncentives = incentives.filter(incentive => {
    const clientName = incentive.client_name || "";
    const referrerName = incentive.referral?.clientName || "";
    const incentiveType = incentive.type || "";
    const searchLower = searchQuery.toLowerCase();
    
    return (
      clientName.toLowerCase().includes(searchLower) ||
      referrerName.toLowerCase().includes(searchLower) ||
      incentiveType.toLowerCase().includes(searchLower)
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
              placeholder="Search incentives..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="shrink-0"
          >
            <Gift className="mr-2 h-4 w-4" />
            New Incentive
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client/Referrer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delivery Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIncentives.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No incentives found. Add one to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIncentives.map((incentive) => (
                    <TableRow 
                      key={incentive.id}
                      onClick={() => setSelectedIncentive(incentive)}
                      className="cursor-pointer hover:bg-accent/40"
                    >
                      <TableCell>
                        {incentive.client_name || incentive.referral?.clientName || "N/A"}
                      </TableCell>
                      <TableCell>{incentive.type || "N/A"}</TableCell>
                      <TableCell className="text-right">
                        {incentive.amount 
                          ? `$${incentive.amount.toLocaleString()}` 
                          : "N/A"}
                      </TableCell>
                      <TableCell className="capitalize">{incentive.status}</TableCell>
                      <TableCell>
                        {incentive.delivery_date 
                          ? new Date(incentive.delivery_date).toLocaleDateString() 
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

      {/* Add Incentive Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Incentive</DialogTitle>
          </DialogHeader>
          <AddIncentiveForm onClose={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Incentive Details Dialog */}
      <Dialog open={!!selectedIncentive} onOpenChange={() => setSelectedIncentive(null)}>
        {selectedIncentive && (
          <IncentiveDetails 
            incentive={selectedIncentive}
            onClose={() => setSelectedIncentive(null)}
          />
        )}
      </Dialog>
    </>
  );
};
