'use client';

import { FileText, Film, Image as ImageIcon } from 'lucide-react';
import { AssetDetailResponse } from '../../types';

export function AssetPreview({ asset }: { asset: AssetDetailResponse }) {
  const ext = asset.fileExtension.toLowerCase();
  const isVideo = ['mp4', 'webm', 'ogg', 'mov'].includes(ext);
  const isImage = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext);

  return (
    <div className="relative w-full aspect-video rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center overflow-hidden shadow-xs">
      {isVideo ? (
        <video
          src={asset.storagePath} // Assuming storagePath maps to the streamable file source
          poster={asset.thumbnail?.url}
          controls
          className="w-full h-full object-contain"
        />
      ) : isImage ? (
        <img
          src={asset.thumbnail?.url || asset.storagePath}
          alt={asset.title}
          className="w-full h-full object-contain"
        />
      ) : (
        /* Fallback for documents, zip files, 3D assets, etc. */
        <div className="flex flex-col items-center gap-3 text-neutral-400 dark:text-neutral-500">
          <FileText className="h-16 w-16 stroke-[1.25]" />
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider font-mono">
              .{asset.fileExtension} File
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              No interactive preview available
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
