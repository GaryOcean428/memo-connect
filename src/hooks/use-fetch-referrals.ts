
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Referral } from '@/components/referrals/ReferralCard';
import { useFetchReferralsAction } from './use-fetch-referrals-action';

export function useFetchReferrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const fetchReferralsAction = useFetchReferralsAction();

  // Wrapper function that manages state updates
  const fetchReferrals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const { data, error } = await fetchReferralsAction();
    
    setReferrals(data);
    if (error) setError(error);
    setIsLoading(false);
  }, [fetchReferralsAction]);

  // Fetch referrals when the component mounts or user changes
  useEffect(() => {
    fetchReferrals();
  }, [user, fetchReferrals]);

  return {
    referrals,
    isLoading,
    error,
    fetchReferrals,
    setReferrals
  };
}
