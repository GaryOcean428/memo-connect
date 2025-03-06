
import React, { useState } from "react";
import { BlurBackground } from "@/components/ui/BlurBackground";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ClientsList } from "@/components/clients/ClientsList";
import { ClientDetails } from "@/components/clients/ClientDetails";
import { AddClientForm } from "@/components/clients/AddClientForm";
import { Client, sampleClients } from "@/types/client";

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter clients based on search query
  const filteredClients = sampleClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  return (
    <PageTransition>
      <BlurBackground />
      <Navbar />
      <main className="pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Clients</h1>
              <p className="text-muted-foreground">Manage your client relationships</p>
            </div>
            <AddClientForm 
              open={isAddDialogOpen} 
              onOpenChange={setIsAddDialogOpen} 
            />
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search clients by name, email or phone..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Clients List */}
          <ClientsList 
            clients={filteredClients}
            onSelectClient={setSelectedClient}
            onAddClient={() => setIsAddDialogOpen(true)}
          />
        </div>
      </main>
      
      {/* Selected Client Dialog */}
      <ClientDetails 
        client={selectedClient}
        open={!!selectedClient}
        onOpenChange={(open) => !open && setSelectedClient(null)}
      />
    </PageTransition>
  );
};

export default Clients;
