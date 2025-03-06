
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

interface ClientsEmptyStateProps {
  onAddClient: () => void;
}

export const ClientsEmptyState: React.FC<ClientsEmptyStateProps> = ({ onAddClient }) => {
  return (
    <div className="text-center py-12 animate-fade-in">
      <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No clients found</h3>
      <p className="text-muted-foreground">
        Try adjusting your search or add a new client.
      </p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={onAddClient}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New Client
      </Button>
    </div>
  );
};
