// components/creator/pagination-controls.tsx
import { PaginationMetadata } from "@/app/(app)/(protected)/creator/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  pagination: PaginationMetadata;
  onPageChange: (newPage: number) => void;
}

export function PaginationControls({ pagination, onPageChange }: PaginationControlsProps) {
  const { currentPage, totalPages } = pagination;

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 pt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900/50 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      <span className="text-sm text-slate-400 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900/50 transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
