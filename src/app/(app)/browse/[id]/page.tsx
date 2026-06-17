'use client';

import { useParams } from 'next/navigation';
import { useGetAnAsset } from './hooks/useGetAnAsset';
import { AssetPreview } from './components/AssetPreview';
import { AssetDetails } from './components/AssetDetails';
import { Loader2 } from 'lucide-react';

export default function AssetDetailPage() {
  const params = useParams();
  const assetId = Number(params.id);

  const { data: asset, isLoading, isError } = useGetAnAsset(assetId);

  // 1. Loading State Skeleton Matrix
  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7 aspect-video rounded-2xl bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-8 w-2/3 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-lg" />
            <div className="h-6 w-1/4 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-lg" />
            <hr className="border-neutral-200 dark:border-neutral-800" />
            <div className="h-16 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-md" />
              <div className="h-4 w-5/6 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Failure Recovery Layout
  if (isError || !asset) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
          Asset Unavailable
        </h2>
        <p className="text-sm text-neutral-500 mt-2">
          The requested record could not be fetched or does not exist.
        </p>
      </div>
    );
  }

  // 3. Complete Loaded Viewport
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left Interactive Column (Visual Context) */}
        <div className="lg:col-span-7 w-full">
          <AssetPreview asset={asset} />
        </div>

        {/* Right Operational Column (Metadata & Checkout Flows) */}
        <div className="lg:col-span-5 w-full">
          <AssetDetails asset={asset} />
        </div>
      </div>
    </div>
  );
}
