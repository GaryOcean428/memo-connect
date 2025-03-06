
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

      if (error) {
        console.error('Error fetching referrals:', error);
        
        // If the table doesn't exist yet, use mock data but don't show an error
        if (error.code === '42P01') {
          console.log('Referrals table does not exist yet. Using mock data instead.');
          return { 
            data: MOCK_REFERRALS.map(mapDbReferralToReferral), 
            error: null 
          };
        }
        
        // For any other errors, show the toast
        toast({
          title: 'Error fetching referrals',
          description: error.message,
          variant: 'destructive',
        });
        
        return { data: [], error: error.message };
      }

      const mappedReferrals = data.map(mapDbReferralToReferral);
      return { data: mappedReferrals, error: null };
    } catch (err: any) {
      console.error('Error fetching referrals:', err);
      
      toast({
        title: 'Error fetching referrals',
        description: err.message,
        variant: 'destructive',
      });
      
      return { data: [], error: err.message };
    }
  }, [user, toast, mapDbReferralToReferral]);

  return fetchReferrals;
}
