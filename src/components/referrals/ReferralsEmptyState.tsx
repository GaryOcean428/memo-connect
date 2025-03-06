
import React from "react";
import { FileText } from "lucide-react";

export const ReferralsEmptyState: React.FC = () => {
  return (
    <div className="text-center py-12 animate-fade-in">
      <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No referrals found</h3>
      <p className="text-muted-foreground">
        Try adjusting your search or filters to find what you're looking for.
      </p>
    </div>
  );
};
