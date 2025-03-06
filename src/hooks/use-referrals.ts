
import { useFetchReferrals } from './use-fetch-referrals';
import { useReferralOperations } from './use-referral-operations';

export function useReferrals() {
  const { 
    referrals, 
    isLoading, 
    error, 
    fetchReferrals 
  } = useFetchReferrals();
  
  const { 
    addReferral, 
    updateReferral, 
    deleteReferral 
  } = useReferralOperations(fetchReferrals);

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
