'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  updateAssetSchema,
  UpdateAssetFormValues,
} from '../schema/updateAssetAchema';
import { Upload, Loader2, ImageIcon } from 'lucide-react';

interface AssetUpdatePreview {
  id: number;
  title: string;
  description: string;
  price: string;
  thumbnailUrl: string | null;
}

interface EditAssetFormProps {
  asset: AssetUpdatePreview;
  isSubmitting: boolean;
  onSubmit: (data: UpdateAssetFormValues) => void;
}

export function EditAssetForm({
  asset,
  isSubmitting,
  onSubmit,
}: EditAssetFormProps) {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedThumbName, setSelectedThumbName] = useState<string | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateAssetFormValues>({
    resolver: zodResolver(updateAssetSchema),
    defaultValues: {
      title: asset.title,
      description: asset.description,
      price: asset.price,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setValue('file', file, { shouldValidate: true });
    } else {
      setSelectedFileName(null);
      // @ts-ignore - explicitly clearing file
      setValue('file', undefined, { shouldValidate: true });
    }
  };

  const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedThumbName(file.name);
      setValue('thumbnailFile', file, { shouldValidate: true });
    } else {
      setSelectedThumbName(null);
      // @ts-ignore - explicitly clearing file
      setValue('thumbnailFile', undefined, { shouldValidate: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 1. Form Section Header */}
      <div className="flex items-start gap-5 border-b border-neutral-100 dark:border-neutral-800 pb-6">
        {asset.thumbnailUrl ? (
          <img
            src={asset.thumbnailUrl}
            alt="Current Asset Thumbnail"
            className="h-16 w-16 rounded-xl object-cover border border-neutral-200 dark:border-neutral-800 shadow-sm"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
            <ImageIcon className="h-6 w-6" />
          </div>
        )}
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            Modify Specification
          </h2>
          <p className="text-xs text-neutral-500">
            Updating live records for deployment cluster #{asset.id}
          </p>
        </div>
      </div>

      {/* 2. Text Content Inputs */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="md:col-span-2 space-y-1">
          <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Asset Title
          </label>
          <input
            {...register('title')}
            type="text"
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-700"
          />
          {errors.title && (
            <p className="text-xs text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Price (USD)
          </label>
          <input
            {...register('price')}
            type="text"
            placeholder="0.00"
            className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-700"
          />
          {errors.price && (
            <p className="text-xs text-red-500">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-700"
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* 3. Optional Binary File Dropzones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Replace Binary Package{' '}
            <span className="font-normal text-neutral-400">(Optional)</span>
          </label>
          <div className="relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-4 text-center transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/10 dark:hover:bg-neutral-900/30">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 z-10 cursor-pointer opacity-0"
            />
            <Upload className="h-5 w-5 text-neutral-400 mb-2" />
            <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              {selectedFileName
                ? `Selected: ${selectedFileName}`
                : 'Drop new asset file here, or click to browse'}
            </p>
            <p className="mt-1 text-[10px] text-neutral-400">
              Leave blank to retain current production file cluster
            </p>
          </div>
          {errors.file && (
            <p className="text-xs text-red-500">{errors.file.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Replace Cover Image{' '}
            <span className="font-normal text-neutral-400">(Optional)</span>
          </label>
          <div className="relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-4 text-center transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/10 dark:hover:bg-neutral-900/30">
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbChange}
              className="absolute inset-0 z-10 cursor-pointer opacity-0"
            />
            <ImageIcon className="h-5 w-5 text-neutral-400 mb-2" />
            <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              {selectedThumbName
                ? `Selected: ${selectedThumbName}`
                : 'Drop new thumbnail here, or click to browse'}
            </p>
            <p className="mt-1 text-[10px] text-neutral-400">
              16:9 Image. Leave blank to retain current thumbnail
            </p>
          </div>
          {errors.thumbnailFile && (
            <p className="text-xs text-red-500">
              {errors.thumbnailFile.message}
            </p>
          )}
        </div>
      </div>

      {/* 4. Action Engine Footer */}
      <div className="flex justify-end pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Commit Asset Modifications
        </button>
      </div>
    </form>
  );
}
