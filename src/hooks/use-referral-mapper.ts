
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
    notes: dbReferral.notes,
    referrerType: dbReferral.referrer_type || 'client', // Ensure a default value if missing
    referrerEmail: dbReferral.referrer_email,
    referrerPhone: dbReferral.referrer_phone,
    recipientEmail: dbReferral.recipient_email,
    isExternal: dbReferral.is_external
  });

  // Convert from our frontend model to the database model
  const mapReferralToDbReferral = (referralData: Partial<Omit<Referral, 'id' | 'date'>>) => {
    const dbReferral: Record<string, any> = {};
    
    if (referralData.clientName !== undefined) dbReferral.client_name = referralData.clientName;
    if (referralData.source !== undefined) dbReferral.source = referralData.source;
    if (referralData.status !== undefined) dbReferral.status = referralData.status;
    if (referralData.value !== undefined) dbReferral.value = referralData.value;
    if (referralData.notes !== undefined) dbReferral.notes = referralData.notes;
    if (referralData.referrerType !== undefined) dbReferral.referrer_type = referralData.referrerType;
    if (referralData.referrerEmail !== undefined) dbReferral.referrer_email = referralData.referrerEmail;
    if (referralData.referrerPhone !== undefined) dbReferral.referrer_phone = referralData.referrerPhone;
    if (referralData.recipientEmail !== undefined) dbReferral.recipient_email = referralData.recipientEmail;
    if (referralData.isExternal !== undefined) dbReferral.is_external = referralData.isExternal;
    
    return dbReferral;
  };

  return {
    mapDbReferralToReferral,
    mapReferralToDbReferral
  };
}
