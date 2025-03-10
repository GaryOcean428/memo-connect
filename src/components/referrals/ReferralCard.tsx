
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReferralStatusBadge } from "./ReferralStatusBadge";
import { formatDate } from "@/lib/utils";
import { ExternalLink, Mail, Phone, User } from "lucide-react";

export interface Referral {
  id: string;
  clientName: string;
  source: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'lost';
  date: string;
  value?: number;
  notes?: string;
  referrerType?: 'broker' | 'client' | 'partner' | 'other';
  referrerEmail?: string;
  referrerPhone?: string;
  recipientEmail?: string;
  isExternal?: boolean;
}

interface ReferralCardProps {
  referral: Referral;
  onClick: () => void;
}

export const ReferralCard: React.FC<ReferralCardProps> = ({ referral, onClick }) => {
  return (
    <Card 
      className="hover:bg-accent/20 transition-colors cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <CardHeader className="pb-2 flex flex-row justify-between">
        <div>
          <h3 className="font-medium text-lg">{referral.clientName}</h3>
          <p className="text-sm text-muted-foreground">From: {referral.source}</p>
        </div>
        <ReferralStatusBadge status={referral.status} />
      </CardHeader>
      
      <CardContent className="pb-2">
        {referral.isExternal && (
          <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 border-blue-200">
            <ExternalLink className="h-3 w-3 mr-1" />
            External Referral
          </Badge>
        )}
        
        <div className="space-y-1">
          {referral.referrerType && (
            <div className="flex items-center text-sm">
              <User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              <span className="capitalize">{referral.referrerType}</span>
            </div>
          )}
          
          {referral.referrerEmail && (
            <div className="flex items-center text-sm">
              <Mail className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              <span className="text-sm">{referral.referrerEmail}</span>
            </div>
          )}
          
          {referral.referrerPhone && (
            <div className="flex items-center text-sm">
              <Phone className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
              <span>{referral.referrerPhone}</span>
            </div>
          )}
          
          {referral.notes && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {referral.notes}
            </p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between text-sm text-muted-foreground">
        <span>{referral.date}</span>
        <span>{referral.value ? `$${referral.value.toLocaleString()}` : "—"}</span>
      </CardFooter>
    </Card>
  );
};
