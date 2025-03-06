
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  // Add the missing accessibility props
  tabIndex?: number;
  role?: string;
  "aria-label"?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ 
  children, 
  className, 
  onClick,
  tabIndex,
  role,
  "aria-label": ariaLabel,
  onKeyDown
}) => {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 smooth-transition hover:shadow-lg dark:glass-dark",
        className
      )}
      onClick={onClick}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
};
