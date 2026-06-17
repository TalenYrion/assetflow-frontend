import Link from 'next/link';
import { Calendar, Tag, ShieldCheck } from 'lucide-react';
import { AssetDetailResponse } from '../../types';
import { PurchaseButton } from '../../components/PurchaseButton';

export function AssetDetails({ asset }: { asset: AssetDetailResponse }) {
  const formattedDate = new Date(asset.updateAT).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col space-y-6">
      {/* Title & Price Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
          {asset.title}
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-neutral-900 dark:text-neutral-50">
            ${asset.price}
          </span>
          <span className="rounded-md bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wide text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-800">
            {asset.fileExtension}
          </span>
        </div>
      </div>

      <hr className="border-neutral-200 dark:border-neutral-800" />

      {/* Creator Attribution */}
      <Link
        href={`/creator/${asset.creator.id}`}
        className="flex items-center gap-3 group p-3 rounded-xl border border-neutral-100 dark:border-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition"
      >
        <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-200 shrink-0 border border-neutral-200 dark:border-neutral-800">
          {asset.creator.avatarUrl ? (
            <img src={asset.creator.avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {asset.creator.firstName?.[0]}
            </div>
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
            Created by
          </p>
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:underline truncate">
            {asset.creator.firstName} {asset.creator.lastName}
          </p>
        </div>
      </Link>

      {/* Description Block */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase text-neutral-400 tracking-wider">
          Description
        </h3>
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
          {asset.description || 'No description provided for this asset.'}
        </p>
      </div>

      {/* Specification Matrix */}
      <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-200/60 dark:border-neutral-800/80 text-xs text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-neutral-400" />
          <span>Updated: <strong>{formattedDate}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-neutral-400" />
          <span>Status: <strong className="text-green-600 dark:text-green-400">{asset.status}</strong></span>
        </div>
      </div>

      {/* Primary Action Button Context */}
      <div className="pt-2">
        <PurchaseButton asset={asset} />
      </div>
    </div>
  );
}
