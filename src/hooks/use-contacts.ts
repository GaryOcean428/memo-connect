
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from './use-toast';

export type Contact = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
};

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // First try to fetch clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('id, name, email, phone')
        .order('name');

      if (clientsError) throw clientsError;

      // Then try to fetch customers if that table exists
      let customersData: any[] = [];
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('id, name, email, phone, company')
          .order('name');
        
        if (!error && data) {
          customersData = data;
        }
      } catch (e) {
        // If table doesn't exist or other error, just continue with clients
        console.log('Customers table may not exist', e);
      }

      // Combine the results
      const combinedContacts = [
        ...(clientsData || []).map(client => ({
          id: client.id,
          name: client.name,
          email: client.email,
          phone: client.phone,
          type: 'client'
        })),
        ...(customersData || []).map(customer => ({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          company: customer.company,
          type: 'customer'
        }))
      ];

      // Sort by name
      combinedContacts.sort((a, b) => a.name.localeCompare(b.name));
      
      setContacts(combinedContacts);
    } catch (error: any) {
      console.error('Error fetching contacts:', error);
      setError(error.message);
      toast({
        title: 'Error loading contacts',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    isLoading,
    error,
    refetch: fetchContacts
  };
}
