
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from './use-toast';
import { Referral } from '@/components/referrals/ReferralCard';
import { useReferralMapper } from './use-referral-mapper';

export function useFetchReferrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const { mapDbReferralToReferral } = useReferralMapper();

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
        console.error('Error fetching referrals:', error);
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

  // Fetch referrals when the component mounts or user changes
  useEffect(() => {
    fetchReferrals();
  }, [user]);

  return {
    referrals,
    isLoading,
    error,
    fetchReferrals,
    setReferrals
  };
}
