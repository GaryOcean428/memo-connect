
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { Referral } from '@/components/referrals/ReferralCard';

// Map database column names to our frontend model
const mapDbReferralToReferral = (dbReferral: any): Referral => ({
  id: dbReferral.id,
  clientName: dbReferral.client_name,
  source: dbReferral.source,
  status: dbReferral.status,
  date: new Date(dbReferral.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }),
  value: dbReferral.value,
  notes: dbReferral.notes
});

export function useReferrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch referrals from Supabase
  const fetchReferrals = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user) {
        setReferrals([]);
        return;
      }

      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        throw error;
      }

      const mappedReferrals = data.map(mapDbReferralToReferral);
      setReferrals(mappedReferrals);
    } catch (err: any) {
      console.error('Error fetching referrals:', err);
      setError(err.message);
      toast({
        title: 'Error fetching referrals',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new referral
  const addReferral = async (referralData: Omit<Referral, 'id' | 'date'>) => {
    try {
      if (!user) {
        throw new Error('You must be logged in to add a referral');
      }

      // Convert from our frontend model to the database model
      const dbReferral = {
        client_name: referralData.clientName,
        source: referralData.source,
        status: referralData.status,
        value: referralData.value,
        notes: referralData.notes,
      };

      const { data, error } = await supabase
        .from('referrals')
        .insert(dbReferral)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Referral added',
        description: 'New referral has been added successfully',
      });

      // Refresh the referrals list
      await fetchReferrals();
      
      return mapDbReferralToReferral(data);
    } catch (err: any) {
      console.error('Error adding referral:', err);
      toast({
        title: 'Error adding referral',
        description: err.message,
        variant: 'destructive',
      });
      throw err;
    }
  };

  // Update a referral
  const updateReferral = async (id: string, referralData: Partial<Omit<Referral, 'id' | 'date'>>) => {
    try {
      if (!user) {
        throw new Error('You must be logged in to update a referral');
      }

      // Convert from our frontend model to the database model
      const dbReferral: any = {};
      if (referralData.clientName !== undefined) dbReferral.client_name = referralData.clientName;
      if (referralData.source !== undefined) dbReferral.source = referralData.source;
      if (referralData.status !== undefined) dbReferral.status = referralData.status;
      if (referralData.value !== undefined) dbReferral.value = referralData.value;
      if (referralData.notes !== undefined) dbReferral.notes = referralData.notes;

      const { error } = await supabase
        .from('referrals')
        .update(dbReferral)
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Referral updated',
        description: 'Referral has been updated successfully',
      });

      // Refresh the referrals list
      await fetchReferrals();
    } catch (err: any) {
      console.error('Error updating referral:', err);
      toast({
        title: 'Error updating referral',
        description: err.message,
        variant: 'destructive',
      });
      throw err;
    }
  };

  // Delete a referral
  const deleteReferral = async (id: string) => {
    try {
      if (!user) {
        throw new Error('You must be logged in to delete a referral');
      }

      const { error } = await supabase
        .from('referrals')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Referral deleted',
        description: 'Referral has been deleted successfully',
      });

      // Refresh the referrals list
      await fetchReferrals();
    } catch (err: any) {
      console.error('Error deleting referral:', err);
      toast({
        title: 'Error deleting referral',
        description: err.message,
        variant: 'destructive',
      });
      throw err;
    }
  };

  // Fetch referrals when the component mounts or user changes
  useEffect(() => {
    fetchReferrals();
  }, [user]);

  return {
    referrals,
    isLoading,
    error,
    fetchReferrals,
    addReferral,
    updateReferral,
    deleteReferral
  };
}
