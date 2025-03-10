
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Incentive } from '@/types/finance';

export const useIncentives = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all incentives
  const fetchIncentives = async (): Promise<Incentive[]> => {
    const { data, error } = await supabase
      .from('incentives')
      .select(`
        *,
        clients (name),
        referrals (id, clientName, source, status, date, value)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching incentives:', error);
      throw error;
    }

    return data.map(item => ({
      ...item,
      client_name: item.clients?.name,
      referral: item.referrals ? {
        id: item.referrals.id,
        clientName: item.referrals.clientName,
        source: item.referrals.source,
        status: item.referrals.status,
        date: item.referrals.date,
        value: item.referrals.value
      } : undefined
    }));
  };

  // Add a new incentive
  const addIncentive = async (incentiveData: Partial<Incentive>) => {
    const { data, error } = await supabase
      .from('incentives')
      .insert(incentiveData)
      .select()
      .single();

    if (error) {
      console.error('Error adding incentive:', error);
      throw error;
    }

    toast({
      title: 'Incentive added',
      description: 'New incentive has been added successfully',
    });

    return data;
  };

  // Update an incentive
  const updateIncentive = async (id: string, incentiveData: Partial<Incentive>) => {
    const { data, error } = await supabase
      .from('incentives')
      .update(incentiveData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating incentive:', error);
      throw error;
    }

    toast({
      title: 'Incentive updated',
      description: 'Incentive has been updated successfully',
    });

    return data;
  };

  // Delete an incentive
  const deleteIncentive = async (id: string) => {
    const { error } = await supabase
      .from('incentives')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting incentive:', error);
      throw error;
    }

    toast({
      title: 'Incentive deleted',
      description: 'Incentive has been deleted successfully',
    });
  };

  // React Query hooks
  const {
    data: incentives = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['incentives'],
    queryFn: fetchIncentives,
  });

  const addIncentiveMutation = useMutation({
    mutationFn: (newIncentive: Partial<Incentive>) => addIncentive(newIncentive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incentives'] });
    },
  });

  const updateIncentiveMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Incentive> }) => 
      updateIncentive(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incentives'] });
    },
  });

  const deleteIncentiveMutation = useMutation({
    mutationFn: (id: string) => deleteIncentive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incentives'] });
    },
  });

  return {
    incentives,
    isLoading,
    error: error ? (error as Error).message : null,
    addIncentive: addIncentiveMutation.mutate,
    updateIncentive: updateIncentiveMutation.mutate,
    deleteIncentive: deleteIncentiveMutation.mutate,
    refetchIncentives: refetch,
  };
};
