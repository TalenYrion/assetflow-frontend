'use client';

import { useGetAnAsset } from '../hooks/useGetOneAsset';
import { useUpdateAsser } from '../hooks/useUpdateAsset';
import { EditAssetForm } from './edit-asset-form';
import { Loader2, AlertCircle } from 'lucide-react';

export function EditAssetContainer({ assetId }: { assetId: number }) {
  const { data: asset, isLoading, isError } = useGetAnAsset(assetId);
  const { mutate: updateAsset, isPending: isUpdating } = useUpdateAsser();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
      </div>
    );
  }

  if (isError || !asset) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/50 p-4 text-sm text-red-600 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p>
          Failed to retrieve asset data. Please verify the asset path or try
          again.
        </p>
      </div>
    );
  }

  return (
    <EditAssetForm
      asset={{
        id: asset.id,
        title: asset.title,
        description: asset.description,
        price: asset.price,
        thumbnailUrl: asset.thumbnailUrl ?? null,
      }}
      isSubmitting={isUpdating}
      onSubmit={(formData) => updateAsset({ assetId, data: formData })}
    />
  );
}
