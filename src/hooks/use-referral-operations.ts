
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from './use-toast';
import { Referral } from '@/components/referrals/ReferralCard';
import { useReferralMapper } from './use-referral-mapper';

export function useReferralOperations(fetchReferrals: () => Promise<void>) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { mapDbReferralToReferral, mapReferralToDbReferral } = useReferralMapper();

  // Add a new referral
  const addReferral = async (referralData: Omit<Referral, 'id' | 'date'>) => {
    try {
      if (!user) {
        throw new Error('You must be logged in to add a referral');
      }

      // Convert from our frontend model to the database model
      const dbReferral = mapReferralToDbReferral(referralData, user.id);

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
      const dbReferral = mapReferralToDbReferral(referralData);

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

  return {
    addReferral,
    updateReferral,
    deleteReferral
  };
}
