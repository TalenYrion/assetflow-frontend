import { BarChart3 } from 'lucide-react';

export function EmptySalesState() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 py-16 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50/30 dark:bg-neutral-900/10 max-w-md mx-auto my-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 mb-4">
        <BarChart3 className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        No sales recorded yet
      </h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 max-w-xs">
        Your items are live, but no transactions have taken place. Share your
        products to jumpstart conversions.
      </p>
    </div>
  );
}
