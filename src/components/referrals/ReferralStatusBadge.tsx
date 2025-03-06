
import React from "react";
import { cn } from "@/lib/utils";

type ReferralStatus = "new" | "contacted" | "in-progress" | "completed" | "lost";

interface ReferralStatusBadgeProps {
  status: ReferralStatus;
}

export const ReferralStatusBadge: React.FC<ReferralStatusBadgeProps> = ({ status }) => {
  const statusColors = {
    "new": "bg-blue-100 text-blue-700",
    "contacted": "bg-purple-100 text-purple-700",
    "in-progress": "bg-amber-100 text-amber-700",
    "completed": "bg-green-100 text-green-700",
    "lost": "bg-red-100 text-red-700",
  };

  return (
    <span className={cn(
      "inline-flex px-2 py-1 text-xs rounded-full",
      statusColors[status]
    )}>
      {status.replace('-', ' ')}
    </span>
  );
};
