// components/creator/asset-card.tsx
import { ProfileAsset } from "@/app/(app)/(protected)/creator/types";
import Link from "next/link";

interface AssetCardProps {
  asset: ProfileAsset;
}

export function AssetCard({ asset }: AssetCardProps) {
  return (
    <Link href={`/browse/${asset.id}`} className="group block">
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 group-hover:border-slate-300 dark:group-hover:border-slate-700/80 rounded-xl overflow-hidden transition-all duration-200 flex flex-col h-full hover:-translate-y-1 hover:shadow-md dark:hover:shadow-lg hover:shadow-slate-100 dark:hover:shadow-black/40">
        
        {/* Media Block Container */}
        <div className="relative aspect-video bg-slate-50 dark:bg-slate-950 w-full overflow-hidden border-b border-slate-100 dark:border-slate-800/50">
          {asset.thumbnailUrl ? (
            <img 
              src={asset.thumbnailUrl} 
              alt={asset.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600 text-sm bg-slate-50 dark:bg-slate-950">
              No Preview
            </div>
          )}
          
          {/* Format Stamp Overlay */}
          <span className="absolute top-2.5 right-2.5 bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700/50 shadow-sm backdrop-blur-sm">
            {asset.fileExtension}
          </span>
        </div>

        {/* Informational Text Payload */}
        <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-1">
              {asset.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {asset.description || "No description provided."}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/40">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Price</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">${Number(asset.price).toFixed(2)}</span>
          </div>
        </div>

      </div>
    </Link>
  );
}
