
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from './use-toast';
import { Referral } from '@/components/referrals/ReferralCard';
import { useReferralMapper } from './use-referral-mapper';
import { MOCK_REFERRALS } from '@/data/referrals';
import { useRef } from 'react';

export function useReferralOperations(fetchReferrals: () => Promise<void>) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { mapDbReferralToReferral, mapReferralToDbReferral } = useReferralMapper();
  const permissionErrorRef = useRef(false);

  // Add a new referral
  const addReferral = async (referralData: Omit<Referral, 'id' | 'date'>) => {
    try {
      if (!user) {
        throw new Error('You must be logged in to add a referral');
      }

      // If we've already encountered a permission error, don't even try to hit Supabase
      if (permissionErrorRef.current) {
        toast({
          title: 'Demo Mode',
          description: 'In demo mode, referrals are not actually saved to the database.',
        });
        
        // Return a fake success with demo data
        const mockReferral = {
          ...MOCK_REFERRALS[0],
          ...referralData,
          id: `demo-${Date.now()}`,
          date: new Date().toISOString()
        };
        
        return mapDbReferralToReferral(mockReferral);
      }

      // Convert from our frontend model to the database model
      const dbReferral = mapReferralToDbReferral({
        ...referralData
      });
      
      // Add the user_id for RLS policies
      dbReferral.user_id = user.id;

      console.log('Adding referral with data:', dbReferral);

      const { data, error } = await supabase
        .from('referrals')
        .insert(dbReferral)
        .select()
        .single();

      if (error) {
        console.error('Supabase error adding referral:', error);
        
        // Handle permission denied error specially
        if (error.code === '42501') {
          permissionErrorRef.current = true;
          toast({
            title: 'Demo Mode',
            description: 'In demo mode, referrals are not actually saved to the database.',
          });
          
          // Return a fake success with demo data
          const mockReferral = {
            ...MOCK_REFERRALS[0],
            ...referralData,
            id: `demo-${Date.now()}`,
            date: new Date().toISOString()
          };
          
          return mapDbReferralToReferral(mockReferral);
        }
        
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

      // If we've already encountered a permission error, don't even try to hit Supabase
      if (permissionErrorRef.current) {
        toast({
          title: 'Demo Mode',
          description: 'In demo mode, referrals are not actually updated in the database.',
        });
        return;
      }

      // Convert from our frontend model to the database model
      const dbReferral = mapReferralToDbReferral(referralData);

      const { error } = await supabase
        .from('referrals')
        .update(dbReferral)
        .eq('id', id);

      if (error) {
        console.error('Supabase error updating referral:', error);
        
        // Handle permission denied error specially
        if (error.code === '42501') {
          permissionErrorRef.current = true;
          toast({
            title: 'Demo Mode',
            description: 'In demo mode, referrals are not actually updated in the database.',
          });
          return;
        }
        
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

      // If we've already encountered a permission error, don't even try to hit Supabase
      if (permissionErrorRef.current) {
        toast({
          title: 'Demo Mode',
          description: 'In demo mode, referrals are not actually deleted from the database.',
        });
        return;
      }

      const { error } = await supabase
        .from('referrals')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error deleting referral:', error);
        
        // Handle permission denied error specially
        if (error.code === '42501') {
          permissionErrorRef.current = true;
          toast({
            title: 'Demo Mode',
            description: 'In demo mode, referrals are not actually deleted from the database.',
          });
          return;
        }
        
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
