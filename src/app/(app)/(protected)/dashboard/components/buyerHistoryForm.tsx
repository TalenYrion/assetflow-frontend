'use strict';

import React from 'react';
import { useBuyerHistory } from '../hooks/useBuyerHistory'; // Path to your query hook
import { OrderCard } from './order-card';
import { EmptyOrderHistory } from './empty-state';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function OrderHistoryClient() {
  const [page, setPage] = React.useState(1);
  const limit = 5;

  const { data: response, isLoading } = useBuyerHistory(page, limit);

  // 1. Loading Skeleton Sequence Block
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[88px] w-full animate-pulse bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl"
          />
        ))}
      </div>
    );
  }

  const orders = response?.data || [];
  const totalOrders = response?.total || 0;
  const totalPages = Math.ceil(totalOrders / limit);

  // 2. Empty Condition Fallback Mounting
  if (orders.length === 0) {
    return <EmptyOrderHistory />;
  }

  return (
    <div className="space-y-4">
      {/* List Execution */}
      <div className="space-y-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {/* Pagination Action Controller */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-900">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Showing Page {page} of {totalPages} ({totalOrders} total items)
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-lg"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
