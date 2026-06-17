'use strict';

import React from 'react';
import { useSellerDashboard } from '../hooks/useSellerDashboard'; // Path to your query hook
import { MetricCard } from './metric-card';
import { SalesRow } from './sales-row';
import { EmptySalesState } from './seller-empty-state';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Activity,
  Wallet,
} from 'lucide-react';

export function SellerDashboardClient() {
  const [page, setPage] = React.useState(1);
  const limit = 5;

  const { data: response, isLoading } = useSellerDashboard(page, limit);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-neutral-100 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800"
            />
          ))}
        </div>
        <div className="h-64 w-full bg-neutral-100 dark:bg-neutral-900 rounded-2xl animate-pulse border border-neutral-200 dark:border-neutral-800" />
      </div>
    );
  }

  const metrics = response?.metrics || {
    totalRevenue: 0,
    netEarnings: 0,
    totalSalesCount: 0,
  };
  const sales = response?.sales || [];
  const totalPages = Math.ceil((response?.total || 0) / limit);

//  console.log("order: ", response);
  return (
    <div className="space-y-6">
      {/* 1. Metrics Grid Layout Component Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="Gross Volume"
          value={`$${metrics.totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          description="Total processing revenue"
        />
        <MetricCard
          title="Net Payout"
          value={`$${metrics.netEarnings.toFixed(2)}`}
          icon={Wallet}
          description="Earnings minus platform cuts"
        />
        <MetricCard
          title="Total Sales"
          value={metrics.totalSalesCount}
          icon={Activity}
          description="Lifetime completed orders"
        />
      </div>

      {/* 2. Main Sales Log Table Record */}
      <div className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-neutral-100 dark:border-neutral-800/80">
          <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Recent Transactions
          </h3>
        </div>

        {sales.length === 0 ? (
          <EmptySalesState />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50/70 dark:bg-neutral-900/50 border-b border-neutral-200/80 dark:border-neutral-800 text-[11px] font-semibold uppercase text-neutral-400 tracking-wider">
                    <th className="py-3 pl-4 pr-3">Product</th>
                    <th className="py-3 px-3 hidden md:table-cell">Customer</th>
                    <th className="py-3 px-3 hidden sm:table-cell">Date</th>
                    <th className="py-3 px-3 text-right hidden lg:table-cell">
                      Platform Fee
                    </th>
                    <th className="py-3 pl-3 pr-4 text-right">Net Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <SalesRow key={sale.id} sale={sale} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* 3. Pagination Controls block */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/20">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Page {page} of {totalPages}
                </p>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-lg"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-lg"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
