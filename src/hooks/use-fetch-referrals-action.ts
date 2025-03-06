
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from './use-toast';
import { useReferralMapper } from './use-referral-mapper';

export function useFetchReferralsAction() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { mapDbReferralToReferral } = useReferralMapper();

  const fetchReferrals = async () => {
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
        throw error;
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
  };

  return fetchReferrals;
}
