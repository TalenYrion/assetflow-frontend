'use client';

import React from 'react';
import { useSellerAssets } from '../../../hooks/useSellerAssets';
import { useDeleteAsset} from '../../../hooks/useDeleteAsset';
import { useToggleAssetStatus } from '../../../hooks/usePublishAsset';
import { AssetsTable } from './assets-table';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Package,
} from 'lucide-react';
import Link from 'next/link';

export default function SellerProductsInventoryPage() {
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // React Query Hooks
  const { data, isLoading, isPlaceholderData } = useSellerAssets(page, limit);
  const { mutate: runDelete } = useDeleteAsset();
  const { mutate: runToggleStatus } = useToggleAssetStatus();

  const handleDelete = (id: number) => {
    if (
      confirm(
        'Are you completely sure you want to permanently delete this asset?',
      )
    ) {
      runDelete(id);
    }
  };

  const handleToggleStatus = (id: number) => {
    runToggleStatus(id);
  };

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <div className="space-y-6">
      {/* Header controls layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-5 gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-2xl">
            Product Inventory
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Manage your assets, edit values, monitor visibility, and deploy
            products to the market.
          </p>
        </div>
        <Link
          href="/dashboard/seller/upload"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 font-semibold text-sm transition-all shadow-sm shrink-0"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          New Asset
        </Link>
      </div>

      {/* Main Core Conditional Views */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] border border-neutral-200 dark:border-neutral-800 bg-neutral-50/20 rounded-2xl gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
          <p className="text-xs text-neutral-500 font-medium">
            Fetching seller store inventory parameters...
          </p>
        </div>
      ) : data?.data && data.data.length > 0 ? (
        <div className="space-y-4">
          <AssetsTable
            assets={data.data}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />

          {/* Pagination Component Footer bar */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800/60 select-none">
              <p className="text-xs text-neutral-500 font-medium">
                Showing entries{' '}
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {(page - 1) * limit + 1}
                </span>{' '}
                to{' '}
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {Math.min(page * limit, data.total)}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {data.total}
                </span>
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                  disabled={page === 1}
                  className="h-9 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4 mr-0.5" />
                  <span className="text-xs font-semibold">Prev</span>
                </button>
                <button
                  onClick={() =>
                    setPage((old) =>
                      data?.total && page < totalPages ? old + 1 : old,
                    )
                  }
                  disabled={page >= totalPages || isPlaceholderData}
                  className="h-9 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors disabled:opacity-40"
                >
                  <span className="text-xs font-semibold">Next</span>
                  <ChevronRight className="h-4 w-4 ml-0.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center min-h-[320px] flex flex-col items-center justify-center bg-neutral-50/10">
          <div className="h-12 w-12 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center text-neutral-400 shadow-sm mb-4">
            <Package className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            No assets discovered
          </h3>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 max-w-sm mx-auto">
            You haven't listed any digital assets onto the exchange system yet.
            Let's build your very first release item package!
          </p>
        </div>
      )}
    </div>
  );
}
