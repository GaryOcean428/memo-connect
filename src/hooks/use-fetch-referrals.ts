
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Referral } from '@/components/referrals/ReferralCard';
import { useFetchReferralsAction } from './use-fetch-referrals-action';

export function useFetchReferrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const fetchReferralsAction = useFetchReferralsAction();
  const initialFetchDoneRef = useRef(false);

  // Wrapper function that manages state updates
  const fetchReferrals = useCallback(async () => {
    // Only show loading state for the initial fetch
    if (referrals.length === 0) {
      setIsLoading(true);
    }
    setError(null);
    
    try {
      const { data, error } = await fetchReferralsAction();
      
      setReferrals(data || []);
      if (error) setError(error);
    } catch (err) {
      console.error('Unexpected error in fetchReferrals:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
      initialFetchDoneRef.current = true;
    }
  }, [fetchReferralsAction, referrals.length]);

  // Fetch referrals when the component mounts or user changes
  useEffect(() => {
    if (user && !initialFetchDoneRef.current) {
      fetchReferrals();
    } else if (!user) {
      // Clear referrals when no user is logged in
      setReferrals([]);
      setIsLoading(false);
      setError(null);
      initialFetchDoneRef.current = false;
    }
  }, [user, fetchReferrals]);

  return {
    referrals,
    isLoading,
    error,
    fetchReferrals,
    setReferrals
  };
}
