
import { Referral } from '@/components/referrals/ReferralCard';

// Map database column names to our frontend model
export function useReferralMapper() {
  const mapDbReferralToReferral = (dbReferral: any): Referral => ({
    id: dbReferral.id,
    clientName: dbReferral.client_name,
    source: dbReferral.source,
    status: dbReferral.status,
    date: new Date(dbReferral.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    value: dbReferral.value,
    notes: dbReferral.notes
  });

  // Convert from our frontend model to the database model
  const mapReferralToDbReferral = (referralData: Partial<Omit<Referral, 'id' | 'date'>>, userId?: string) => {
    const dbReferral: Record<string, any> = {};
    
    if (userId) dbReferral.user_id = userId;
    if (referralData.clientName !== undefined) dbReferral.client_name = referralData.clientName;
    if (referralData.source !== undefined) dbReferral.source = referralData.source;
    if (referralData.status !== undefined) dbReferral.status = referralData.status;
    if (referralData.value !== undefined) dbReferral.value = referralData.value;
    if (referralData.notes !== undefined) dbReferral.notes = referralData.notes;
    
    return dbReferral;
  };

  return {
    mapDbReferralToReferral,
    mapReferralToDbReferral
  };
}
