
import React from "react";
import { DashboardCard } from "./DashboardCard";

type ActivityType = "referral" | "client" | "commission";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
}

const activityIcons: Record<ActivityType, React.ReactNode> = {
  referral: (
    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
      R
    </div>
  ),
  client: (
    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
      C
    </div>
  ),
  commission: (
    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
      $
    </div>
  ),
};

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <DashboardCard className="h-full">
      <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
      <div className="space-y-4 custom-scrollbar max-h-[400px] overflow-y-auto pr-2">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-3 p-3 rounded-lg hover:bg-secondary smooth-transition"
          >
            {activityIcons[activity.type]}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm">{activity.title}</h4>
              <p className="text-muted-foreground text-xs truncate">
                {activity.description}
              </p>
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">
              {activity.date}
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};
