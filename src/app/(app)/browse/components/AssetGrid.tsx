import { Asset } from '../types';
import { BrowserQuery } from '../schema/browserSchema';
import { PurchaseButton } from './PurchaseButton';
import Link from 'next/link';

interface GridProps {
  assets: Asset[];
  isLoading: boolean;
  total: number;
  filters: BrowserQuery;
  setFilters: React.Dispatch<React.SetStateAction<BrowserQuery>>;
  onPurchase?: (asset: Asset) => void;
}

export function AssetGrid({
  assets,
  isLoading,
  total,
  filters,
  setFilters,
  onPurchase,
}: GridProps) {
  const totalPages = Math.ceil(total / filters.limit);

  if (isLoading && assets.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-neutral-200 bg-white p-4 h-48 sm:h-80 dark:border-neutral-800 dark:bg-neutral-950"
          />
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="text-center py-24 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800">
        <p className="text-sm text-neutral-500">
          No assets matching the active filter parameters were found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
          >
            {/* Asset Link Context */}
            <Link href={`/browse/${asset.id}`} className="flex flex-col flex-1">
              <div className="relative aspect-video w-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center overflow-hidden border-b border-neutral-100 dark:border-neutral-900">
                {asset.thumbnail?.url ? (
                  <img
                    src={asset.thumbnail.url}
                    alt={asset.title}
                    className="h-full w-full object-cover transition group-hover:scale-105 duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-neutral-400 dark:text-neutral-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase font-semibold">No Preview</span>
                  </div>
                )}
                <span className="absolute bottom-2 right-2 rounded bg-neutral-900/80 px-1.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-semibold uppercase text-white backdrop-blur-xs">
                  {asset.fileExtension}
                </span>
              </div>

              <div className="flex flex-col p-3 sm:p-4 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-2">
                  <h3 className="text-xs sm:text-sm font-semibold truncate text-neutral-900 dark:text-neutral-50 group-hover:text-blue-500 transition">
                    {asset.title}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 shrink-0">
                    ${asset.price}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-neutral-500 line-clamp-2 min-h-[2rem]">
                  {asset.description}
                </p>
              </div>
            </Link>

            {/* Content Control Footer */}
            <div className="p-3 pt-0 sm:p-4 sm:pt-0 border-t border-neutral-100 dark:border-neutral-900/60 space-y-3 mt-auto">
              <Link 
                href={`/creator/${asset.creator.id}`}
                className="flex items-center gap-2 pt-2 sm:pt-3 hover:opacity-80 transition max-w-max"
              >
                <div className="h-4 w-4 sm:h-5 sm:w-5 overflow-hidden rounded-full bg-neutral-200 shrink-0">
                  {asset.creator.avatarUrl ? (
                    <img src={asset.creator.avatarUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-blue-600" />
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-neutral-600 dark:text-neutral-400 hover:underline truncate">
                  {asset.creator.firstName} {asset.creator.lastName}
                </span>
              </Link>

              {/* 💡 MODULAR SWAP: Clean call to independent authentication gateway */}
              <PurchaseButton asset={asset} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 dark:border-neutral-800 pt-6">
          <p className="text-xs text-neutral-500">Showing {assets.length} of {total} items</p>
          <div className="flex gap-2">
            <button
              disabled={filters.page === 1}
              onClick={() => setFilters((p) => ({ ...p, page: p.page - 1 }))}
              className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold disabled:opacity-40 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              Previous
            </button>
            <button
              disabled={filters.page >= totalPages}
              onClick={() => setFilters((p) => ({ ...p, page: p.page + 1 }))}
              className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold disabled:opacity-40 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
