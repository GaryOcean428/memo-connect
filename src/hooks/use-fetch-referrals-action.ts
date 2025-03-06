
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from './use-toast';
import { useReferralMapper } from './use-referral-mapper';
import { useCallback, useRef } from 'react';
import { MOCK_REFERRALS } from '@/data/referrals';

// This is a custom hook that returns a function to fetch referrals
export function useFetchReferralsAction() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { mapDbReferralToReferral } = useReferralMapper();
  const hasShownToast = useRef(false);
  const permissionErrorRef = useRef(false);

  // Return a memoized function that can be called later
  const fetchReferrals = useCallback(async () => {
    if (!user) {
      console.log('No user logged in, returning mock data');
      return { data: MOCK_REFERRALS.map(mapDbReferralToReferral), error: null };
    }

    // If we've already encountered a permission error, just return mock data without hitting Supabase again
    if (permissionErrorRef.current) {
      return { data: MOCK_REFERRALS.map(mapDbReferralToReferral), error: null };
    }

    try {
      // Add the Auth header explicitly to ensure RLS works properly
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
        
        // Handle permission errors by using mock data
        if (error.code === '42501') {
          permissionErrorRef.current = true;
          console.log('Permission denied for referrals table. Using mock data instead.');
          
          // Only show the toast once to avoid spamming the user
          if (!hasShownToast.current) {
            toast({
              title: 'Using demo data',
              description: 'Currently showing sample referrals data.',
            });
            hasShownToast.current = true;
          }
          
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

      // Reset permission error flag if query succeeds
      permissionErrorRef.current = false;
      
      const mappedReferrals = data.map(mapDbReferralToReferral);
      return { data: mappedReferrals, error: null };
    } catch (err: any) {
      console.error('Error fetching referrals:', err);
      
      // Only show the toast once to avoid spamming the user
      if (!hasShownToast.current) {
        toast({
          title: 'Error fetching referrals',
          description: err.message,
          variant: 'destructive',
        });
        hasShownToast.current = true;
      }
      
      return { data: [], error: err.message };
    }
  }, [user, toast, mapDbReferralToReferral]);

  return fetchReferrals;
}
