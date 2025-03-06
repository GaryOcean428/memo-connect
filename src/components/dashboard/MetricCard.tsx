
import React from "react";
import { cn } from "@/lib/utils";
import { DashboardCard } from "./DashboardCard";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
}) => {
  return (
    <DashboardCard className={cn("flex flex-col gap-2", className)}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-full bg-primary/10 text-primary">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">{value}</span>
          {trend && (
            <div className="flex items-center gap-1 text-xs">
              <span
                className={cn(
                  trend.isPositive ? "text-green-500" : "text-rose-500"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </DashboardCard>
  );
};
