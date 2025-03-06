
import React from "react";
import { Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Client } from "@/types/client";

interface ClientItemProps {
  client: Client;
  onClick: () => void;
}

// Get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

// Get status color
const getStatusColor = (status: Client['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700';
    case 'pending':
      return 'bg-amber-100 text-amber-700';
    case 'completed':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const ClientItem: React.FC<ClientItemProps> = ({ client, onClick }) => {
  return (
    <DashboardCard 
      className="hover:border-primary cursor-pointer transition-all"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 border">
          <AvatarFallback className="bg-primary/10 text-primary">
            {getInitials(client.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium truncate">{client.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(client.status)}`}>
              {client.status}
            </span>
          </div>
          <div className="text-sm text-muted-foreground mb-3 truncate">
            {client.loanType} {client.loanAmount && `- $${client.loanAmount.toLocaleString()}`}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-sm gap-2">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="truncate">{client.email}</span>
            </div>
            <div className="flex items-center text-sm gap-2">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{client.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};
