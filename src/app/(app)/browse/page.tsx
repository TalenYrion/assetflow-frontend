'use client';

import { useState } from 'react';
import { useGetAssets } from './hooks/useGetAssets';
import { BrowserQuery } from './schema/browserSchema';
import { SearchBar } from './components/SearchBar';
import { FilterSidebar } from './components/FilterSidebar';
import { AssetGrid } from './components/AssetGrid';
import { useGetFileTYpes } from './hooks/useGetFileTypes';

export default function BrowsePage() {
  const [filters, setFilters] = useState<BrowserQuery>({
    page: 1,
    limit: 12,
    search: '',
    minPrice: undefined,
    extension: '',
  });

  const { data: assetData, isPending: isAssetsLoading } = useGetAssets(filters);
  const { data: fileTypes = [] } = useGetFileTYpes();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Header and Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Asset Browser</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Discover and provision verified digital marketplace systems.
            </p>
          </div>
          <SearchBar
            value={filters.search}
            onChange={(val) =>
              setFilters((prev) => ({ ...prev, search: val, page: 1 }))
            }
          />
        </div>

        {/* Dynamic Workspace */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            fileTypes={fileTypes}
          />
          <main className="flex-1 w-full">
            <AssetGrid
              assets={assetData?.data || []}
              isLoading={isAssetsLoading}
              total={assetData?.total || 0}
              filters={filters}
              setFilters={setFilters}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
