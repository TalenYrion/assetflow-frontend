// components/creator/profile-header.tsx
import { Creator, CreatorMetrics } from "@/app/(app)/(protected)/creator/types";
import { Calendar, Layers, ShoppingBag } from "lucide-react";

interface ProfileHeaderProps {
  creator: Creator;
  metrics: CreatorMetrics;
}

export function ProfileHeader({ creator, metrics }: ProfileHeaderProps) {
  const joinDate = new Date(creator.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start justify-between">
        
        {/* Left Side: Avatar and Identity */}
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-primary/20 flex items-center justify-center overflow-hidden text-2xl font-bold text-slate-700 dark:text-white">
            {creator.avatarUrl ? (
              <img src={creator.avatarUrl} alt={creator.firstName} className="h-full w-full object-cover" />
            ) : (
              `${creator.firstName[0]}${creator.lastName[0]}`
            )}
          </div>
          <div className="space-y-1.5 mt-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {creator.firstName} {creator.lastName}
            </h1>
            <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 justify-center sm:justify-start">
              <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <span>Member since {joinDate}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Trust Metrics */}
        <div className="flex gap-4 w-full sm:w-auto justify-center md:justify-end">
          <div className="bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl px-5 py-3 text-center min-w-[110px]">
            <div className="flex justify-center mb-1 text-slate-500 dark:text-slate-400">
              <Layers className="h-4 w-4" />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{metrics.activeAssetsCount}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">Active Assets</div>
          </div>

          <div className="bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl px-5 py-3 text-center min-w-[110px]">
            <div className="flex justify-center mb-1 text-emerald-600 dark:text-emerald-400">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{metrics.totalSalesCount}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">Total Sales</div>
          </div>
        </div>

      </div>
    </div>
  );
}
