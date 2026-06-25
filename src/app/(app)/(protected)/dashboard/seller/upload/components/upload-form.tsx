'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileDropzone } from './file-dropzone';
import { DollarSign } from 'lucide-react';
import { AssetFormValues, assetSchema } from '../../../schema/assetSchema';
import { useAssetCreate } from '../../../hooks/useAssetCreate';

export function UploadAssetForm() {
  const { mutate: createAsset, isPending } = useAssetCreate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AssetFormValues>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      file: undefined,
      thumbnailFile: undefined,
    },
  });

  const onSubmit = (data: AssetFormValues) => {
    createAsset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      {/* 1. Asset Title */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          Asset Title
        </label>
        <input
          {...register('title')}
          type="text"
          placeholder="e.g. Low-Poly Cyberpunk Character Model"
          className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white/20 transition-all"
        />
        {errors.title && (
          <p className="text-xs font-medium text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* 2. Asset Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={5}
          placeholder="Describe your asset, including extensions, licenses, and features..."
          className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white/20 transition-all resize-none"
        />
        {errors.description && (
          <p className="text-xs font-medium text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* 3. Price Allocation Input */}
      <div className="space-y-1.5 max-w-sm">
        <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          Price (USD)
        </label>
        <div className="relative rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <DollarSign className="h-4 w-4" />
          </div>
          <input
            {...register('price')}
            type="text"
            placeholder="19.99"
            className="w-full text-sm pl-9 pr-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white/20 transition-all"
          />
        </div>
        {errors.price && (
          <p className="text-xs font-medium text-red-500">
            {errors.price.message}
          </p>
        )}
      </div>

      {/* 4. Dropzone File Uploader Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <FileDropzone
              value={field.value ?? null}
              onChange={field.onChange}
              error={errors.file?.message}
              label="Asset Package File"
              description="Supports images, 3D files, ZIPs up to 100MB"
            />
          )}
        />

        {/* 5. Custom Cover Image (Optional) */}
        <Controller
          name="thumbnailFile"
          control={control}
          render={({ field }) => (
            <FileDropzone
              value={field.value ?? null}
              onChange={field.onChange}
              error={errors.thumbnailFile?.message}
              label="Custom Cover Image (Optional)"
              description="Upload a 16:9 image. If empty, we'll auto-generate one."
              accept="image/*"
            />
          )}
        />
      </div>

      {/* 6. Execution Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full md:w-auto px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 font-semibold text-sm transition-all shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Uploading Package...' : 'Upload Asset Package'}
      </button>
    </form>
  );
}
