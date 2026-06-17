'use client';

import { UploadAssetForm } from './upload-form';

export default function UploadAssetPage() {
  return (
    <div className="space-y-6">
      {/* Structural Context Header */}
      <div className="border-b border-neutral-100 dark:border-neutral-800/80 pb-5">
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-2xl">
          Publish New Asset
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Upload your digital assets directly into the creative market
          infrastructure.
        </p>
      </div>

      {/* Main Execution Core Form Grid */}
      <div className="bg-white dark:bg-neutral-900/20 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 md:p-8 shadow-sm">
        <UploadAssetForm />
      </div>
    </div>
  );
}
