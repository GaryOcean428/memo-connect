
import { useState, useEffect } from 'react';

export interface LenderCommissionRate {
  lenderName: string;
  upfrontRate: number; // Percentage
  trailRate: number; // Percentage
}

// Mock data - in a real application, this would come from an API or database
const DEFAULT_COMMISSION_RATES: LenderCommissionRate[] = [
  { lenderName: 'Commonwealth Bank', upfrontRate: 0.65, trailRate: 0.15 },
  { lenderName: 'ANZ', upfrontRate: 0.60, trailRate: 0.15 },
  { lenderName: 'Westpac', upfrontRate: 0.65, trailRate: 0.20 },
  { lenderName: 'NAB', upfrontRate: 0.60, trailRate: 0.15 },
  { lenderName: 'Macquarie', upfrontRate: 0.70, trailRate: 0.25 },
  { lenderName: 'ING', upfrontRate: 0.65, trailRate: 0.15 },
  { lenderName: 'Suncorp', upfrontRate: 0.65, trailRate: 0.15 },
  { lenderName: 'St. George', upfrontRate: 0.65, trailRate: 0.20 },
  { lenderName: 'Bank of Queensland', upfrontRate: 0.60, trailRate: 0.15 },
  { lenderName: 'Bendigo Bank', upfrontRate: 0.65, trailRate: 0.15 },
];

export function useCommissionRates() {
  const [commissionRates, setCommissionRates] = useState<LenderCommissionRate[]>(DEFAULT_COMMISSION_RATES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This would typically fetch from an API endpoint
  useEffect(() => {
    const fetchCommissionRates = async () => {
      // In a real application, you would fetch from an API here
      // For now, we'll just simulate a delay
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In real application: const response = await fetch('/api/commission-rates');
        // const data = await response.json();
        // setCommissionRates(data);
        
        setCommissionRates(DEFAULT_COMMISSION_RATES);
      } catch (err) {
        console.error('Error fetching commission rates:', err);
        setError('Failed to load commission rates. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommissionRates();
  }, []);

  const calculateCommission = (lender: string, loanAmount: number) => {
    const lenderRate = commissionRates.find(rate => 
      rate.lenderName.toLowerCase() === lender.toLowerCase()
    );
    
    if (!lenderRate) return { upfront: 0, trail: 0 };
    
    const upfront = (lenderRate.upfrontRate / 100) * loanAmount;
    const trail = (lenderRate.trailRate / 100) * loanAmount;
    
    return { upfront, trail };
  };

  return {
    commissionRates,
    isLoading,
    error,
    calculateCommission
  };
}
