import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  description,
}: MetricCardProps) {
  return (
    <div className="p-5 bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex items-center justify-between shadow-sm">
      <div className="space-y-1">
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {title}
        </span>
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          {value}
        </h3>
        {description && (
          <p className="text-[11px] text-neutral-400">{description}</p>
        )}
      </div>
      <div className="h-10 w-10 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}
