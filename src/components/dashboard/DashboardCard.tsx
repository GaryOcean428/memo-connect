
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 smooth-transition hover:shadow-lg dark:glass-dark",
        className
      )}
    >
      {children}
    </div>
  );
};
