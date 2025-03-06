
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from './use-toast';
import { useReferralMapper } from './use-referral-mapper';
import { useCallback } from 'react';
import { MOCK_REFERRALS } from '@/data/referrals';

// This is a custom hook that returns a function to fetch referrals
export function useFetchReferralsAction() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { mapDbReferralToReferral } = useReferralMapper();

  // Return a memoized function that can be called later
  const fetchReferrals = useCallback(async () => {
    if (!user) {
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .order('date', { ascending: false });

      // Check if the error is because the table doesn't exist
      if (error && error.code === '42P01') {
        console.log('Referrals table does not exist yet. Using mock data instead.');
        // Use mock data if the table doesn't exist
        return { 
          data: MOCK_REFERRALS.map(mapDbReferralToReferral), 
          error: null 
        };
      }

      if (error) {
        console.error('Error fetching referrals:', error);
        throw error;
      }

      const mappedReferrals = data.map(mapDbReferralToReferral);
      return { data: mappedReferrals, error: null };
    } catch (err: any) {
      console.error('Error fetching referrals:', err);
      
      // Don't show toast for table not existing error when using mock data
      if (!(err.code === '42P01')) {
        toast({
          title: 'Error fetching referrals',
          description: err.message,
          variant: 'destructive',
        });
      }
      
      return { data: [], error: err.message };
    }
  }, [user, toast, mapDbReferralToReferral]);

  return fetchReferrals;
}
