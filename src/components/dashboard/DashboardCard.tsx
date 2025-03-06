
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void; // Add onClick prop to the interface
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ children, className, onClick }) => {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 smooth-transition hover:shadow-lg dark:glass-dark",
        className
      )}
      onClick={onClick} // Add onClick handler
    >
      {children}
    </div>
  );
};
