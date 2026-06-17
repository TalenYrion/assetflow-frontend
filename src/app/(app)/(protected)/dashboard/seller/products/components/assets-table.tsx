'use client';

import React from 'react';
import { Edit2, Trash2, Globe, EyeOff, Package } from 'lucide-react';
import Link from 'next/link';
import { SellerAssetItem } from '../types/index';

interface AssetsTableProps {
  assets: SellerAssetItem[];
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export function AssetsTable({
  assets,
  onDelete,
  onToggleStatus,
}: AssetsTableProps) {
  return (
    <div className="w-full overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-950 shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 text-neutral-500 font-semibold select-none">
            <th className="p-4">Asset Info</th>
            <th className="p-4">Status</th>
            <th className="p-4">Price</th>
            <th className="p-4">Format</th>
            <th className="p-4">Last Updated</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
          {assets.map((asset) => (
            <tr
              key={asset.id}
              className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/10 transition-colors group"
            >
              {/* Thumbnail info block */}
              <td className="p-4 max-w-sm">
                <div className="flex items-center gap-3">
                  {asset.thumbnail?.url ? (
                    <div className="h-12 w-12 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shrink-0 bg-neutral-50">
                      <img
                        src={asset.thumbnail.url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center shrink-0 text-neutral-400">
                      <Package className="h-5 w-5" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                      {asset.title}
                    </p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate max-w-[240px]">
                      {asset.description}
                    </p>
                  </div>
                </div>
              </td>

              {/* Status Badges */}
              <td className="p-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
                    asset.status === 'PUBLISHED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30'
                      : 'bg-neutral-100 text-neutral-600 border border-neutral-200 dark:bg-neutral-800/40 dark:text-neutral-400 dark:border-neutral-800'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${asset.status === 'PUBLISHED' ? 'bg-emerald-500' : 'bg-neutral-400'}`}
                  />
                  {asset.status}
                </span>
              </td>

              <td className="p-4 font-medium text-neutral-900 dark:text-neutral-100">
                ${parseFloat(asset.price).toFixed(2)}
              </td>

              <td className="p-4">
                <span className="text-xs font-bold uppercase px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-500">
                  {asset.fileExtension}
                </span>
              </td>

              <td className="p-4 text-xs text-neutral-400 dark:text-neutral-500">
                {new Date(asset.updateAT).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>

              {/* Action Buttons Row */}
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {/* Status Toggle Button */}
                  <button
                    type="button"
                    onClick={() => onToggleStatus(asset.id)}
                    title={
                      asset.status === 'PUBLISHED'
                        ? 'Change to Draft'
                        : 'Publish Asset'
                    }
                    className="h-8 w-8 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-all"
                  >
                    {asset.status === 'PUBLISHED' ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Globe className="h-3.5 w-3.5" />
                    )}
                  </button>

                  {/* Dynamic Edit Navigation Link */}
                  <Link
                    href={`/dashboard/seller/products/${asset.id}`}
                    title="Edit Asset Data"
                    className="h-8 w-8 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-all"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Link>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => onDelete(asset.id)}
                    title="Delete Asset Package"
                    className="h-8 w-8 rounded-lg flex items-center justify-center border border-red-200 dark:border-red-950/40 hover:bg-red-50 dark:hover:bg-red-950/20 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
