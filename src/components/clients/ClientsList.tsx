
import React from "react";
import { ClientItem } from "./ClientItem";
import { ClientsEmptyState } from "./ClientsEmptyState";
import { Client } from "@/types/client";

interface ClientsListProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
  onAddClient: () => void;
}

export const ClientsList: React.FC<ClientsListProps> = ({ 
  clients, 
  onSelectClient, 
  onAddClient 
}) => {
  if (clients.length === 0) {
    return <ClientsEmptyState onAddClient={onAddClient} />;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
      {clients.map((client) => (
        <ClientItem 
          key={client.id}
          client={client}
          onClick={() => onSelectClient(client)}
        />
      ))}
    </div>
  );
};
