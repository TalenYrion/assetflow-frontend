// app/(app)/(protected)/creator/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useCreatorProfile } from "../hooks/useCreatorProfilea";
import { ProfileHeader } from "../components/profile-header";
import { AssetCard } from "../components/asset-card";
import { PaginationControls } from "../components/pagination-controls";
import { Loader2 } from "lucide-react";

export default function CreatorProfilePage() {
  const params = useParams();
  const userId = Number(params.id);
  
  const [page, setPage] = useState(1);
  const { data, isLoading } = useCreatorProfile(userId, page, 12); // Loading 12 grid blocks per layout slice

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-slate-400">Loading creator workspace...</p>
      </div>
    );
  }

  if (!data) return <div className="text-center text-slate-400 py-12">Profile data unavailable.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      
      {/* Upper Core Header Identity Block */}
      <ProfileHeader creator={data.creator} metrics={data.metrics} />

      {/* Catalog Title Marker */}
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-xl font-bold text-white tracking-tight">Available Assets</h2>
        </div>

        {/* Marketplace Grid Matrix */}
        {data.assets.length === 0 ? (
          <div className="text-center bg-slate-900/10 border border-dashed border-slate-800 rounded-xl p-12 text-slate-500 text-sm">
            This creator has not published any digital items yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data.assets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        )}

        {/* Dynamic Pagination Footer */}
        <PaginationControls pagination={data.pagination} onPageChange={setPage} />
      </div>

    </div>
  );
}
