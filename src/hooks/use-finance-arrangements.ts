
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { FinanceArrangement } from '@/types/finance';

export const useFinanceArrangements = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all finance arrangements
  const fetchFinanceArrangements = async (): Promise<FinanceArrangement[]> => {
    const { data, error } = await supabase
      .from('finance_arrangements')
      .select(`
        *,
        clients (name),
        referrals (id, client_name, source, status, date, value)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching finance arrangements:', error);
      throw error;
    }

    return data.map(item => ({
      ...item,
      client_name: item.clients?.name,
      referral: item.referrals
    }));
  };

  // Add a new finance arrangement
  const addFinanceArrangement = async (financeData: Partial<FinanceArrangement>) => {
    const { data, error } = await supabase
      .from('finance_arrangements')
      .insert(financeData)
      .select()
      .single();

    if (error) {
      console.error('Error adding finance arrangement:', error);
      throw error;
    }

    toast({
      title: 'Finance arrangement added',
      description: 'New finance arrangement has been added successfully',
    });

    return data;
  };

  // Update a finance arrangement
  const updateFinanceArrangement = async (id: string, financeData: Partial<FinanceArrangement>) => {
    const { data, error } = await supabase
      .from('finance_arrangements')
      .update(financeData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating finance arrangement:', error);
      throw error;
    }

    toast({
      title: 'Finance arrangement updated',
      description: 'Finance arrangement has been updated successfully',
    });

    return data;
  };

  // Delete a finance arrangement
  const deleteFinanceArrangement = async (id: string) => {
    const { error } = await supabase
      .from('finance_arrangements')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting finance arrangement:', error);
      throw error;
    }

    toast({
      title: 'Finance arrangement deleted',
      description: 'Finance arrangement has been deleted successfully',
    });
  };

  // React Query hooks
  const {
    data: financeArrangements = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['financeArrangements'],
    queryFn: fetchFinanceArrangements,
  });

  const addFinanceMutation = useMutation({
    mutationFn: (newFinance: Partial<FinanceArrangement>) => addFinanceArrangement(newFinance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financeArrangements'] });
    },
  });

  const updateFinanceMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FinanceArrangement> }) => 
      updateFinanceArrangement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financeArrangements'] });
    },
  });

  const deleteFinanceMutation = useMutation({
    mutationFn: (id: string) => deleteFinanceArrangement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financeArrangements'] });
    },
  });

  return {
    financeArrangements,
    isLoading,
    error: error ? (error as Error).message : null,
    addFinanceArrangement: addFinanceMutation.mutate,
    updateFinanceArrangement: updateFinanceMutation.mutate,
    deleteFinanceArrangement: deleteFinanceMutation.mutate,
    refetchFinanceArrangements: refetch,
  };
};
