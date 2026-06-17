import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function EmptyOrderHistory() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 py-16 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl bg-neutral-50/30 dark:bg-neutral-900/10 max-w-md mx-auto my-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 mb-4">
        <ShoppingCart className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        No orders found
      </h3>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 max-w-xs">
        You haven&apos;t purchased any assets yet. Explore the marketplace to
        find tools for your workflow.
      </p>
      <Button size="sm" className="mt-5 rounded-xl px-4 font-medium">
        <Link href="/browse">Browse Marketplace</Link>
      </Button>
    </div>
  );
}
