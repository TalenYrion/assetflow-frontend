'use client';

import { Order } from '../types/index';
import { ShoppingBag, Calendar, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {useDowloadAsset} from '../hooks/useDownloadAsset';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
if (!order) return null;
  const { mutate: download, isPending } = useDowloadAsset();

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Safe fallback lookup map for dynamic status styling
  const statusStyles: Record<string, string> = {
    COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900',
    SUCCESS: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900',
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900',
    REFUNDED: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900',
  };

  // Only allow downloads for successful/completed transactions
  const isDownloadable = order.status === 'SUCCESS';

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl gap-4 transition-all hover:border-neutral-300 dark:hover:border-neutral-700">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Thumbnail Mask Box */}
        <div className="h-14 w-14 shrink-0 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden flex items-center justify-center">
          {order.asset.thumbnail?.url ? (
            <img
              src={order.asset.thumbnail.url}
              alt={order.asset.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <ShoppingBag className="h-5 w-5 text-neutral-400" />
          )}
        </div>

        {/* Text Area */}
        <div className="space-y-1 min-w-0">
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
            {order.asset.title}
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[280px]">
            {order.asset.description}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {formattedDate}
            </span>
            <span className="flex items-center gap-1 uppercase">
              .{order.asset.fileExtension}
            </span>
          </div>
        </div>
      </div>

      {/* Financials, Status & Action Blocks */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800 gap-2">
        <div className="flex flex-col sm:items-end">
          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            ${parseFloat(order.pricePaid).toFixed(2)}
          </div>
          <div className="mt-0.5">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusStyles[order.status] || 'bg-neutral-50 border-neutral-200'}`}>
              {order.status}
            </span>
          </div>
        </div>

        {/* Professional Download Trigger Action */}
        {isDownloadable && (
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            onClick={() => download(order.asset.id)}
            className="h-8 rounded-lg text-xs font-medium gap-1.5 border-neutral-200 dark:border-neutral-800 shadow-xs hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            Download
          </Button>
        )}
      </div>
    </div>
  );
}
