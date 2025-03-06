
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Commission } from '@/types/finance';

export const useCommissions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all commissions
  const fetchCommissions = async (): Promise<Commission[]> => {
    const { data, error } = await supabase
      .from('commissions')
      .select(`
        *,
        finance_arrangements (
          id, loan_amount, loan_type, lender, status,
          clients (name),
          referrals (client_name)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching commissions:', error);
      throw error;
    }

    return data.map(item => ({
      ...item,
      finance_arrangement: item.finance_arrangements
    }));
  };

  // Add a new commission
  const addCommission = async (commissionData: Partial<Commission>) => {
    const { data, error } = await supabase
      .from('commissions')
      .insert(commissionData)
      .select()
      .single();

    if (error) {
      console.error('Error adding commission:', error);
      throw error;
    }

    toast({
      title: 'Commission added',
      description: 'New commission has been added successfully',
    });

    return data;
  };

  // Update a commission
  const updateCommission = async (id: string, commissionData: Partial<Commission>) => {
    const { data, error } = await supabase
      .from('commissions')
      .update(commissionData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating commission:', error);
      throw error;
    }

    toast({
      title: 'Commission updated',
      description: 'Commission has been updated successfully',
    });

    return data;
  };

  // Delete a commission
  const deleteCommission = async (id: string) => {
    const { error } = await supabase
      .from('commissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting commission:', error);
      throw error;
    }

    toast({
      title: 'Commission deleted',
      description: 'Commission has been deleted successfully',
    });
  };

  // React Query hooks
  const {
    data: commissions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['commissions'],
    queryFn: fetchCommissions,
  });

  const addCommissionMutation = useMutation({
    mutationFn: (newCommission: Partial<Commission>) => addCommission(newCommission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
    },
  });

  const updateCommissionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Commission> }) => 
      updateCommission(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
    },
  });

  const deleteCommissionMutation = useMutation({
    mutationFn: (id: string) => deleteCommission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
    },
  });

  return {
    commissions,
    isLoading,
    error: error ? (error as Error).message : null,
    addCommission: addCommissionMutation.mutate,
    updateCommission: updateCommissionMutation.mutate,
    deleteCommission: deleteCommissionMutation.mutate,
    refetchCommissions: refetch,
  };
};
