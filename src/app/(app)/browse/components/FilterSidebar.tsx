import React, { useState } from 'react';
import { BrowserQuery } from '../schema/browserSchema';

interface SidebarProps {
  filters: BrowserQuery;
  setFilters: React.Dispatch<React.SetStateAction<BrowserQuery>>;
  fileTypes: Array<{ extension: string }>;
}

export function FilterSidebar({
  filters,
  setFilters,
  fileTypes,
}: SidebarProps) {
  // 💡 Added state to manage mobile accordion toggle
  const [isOpen, setIsOpen] = useState(false);
  const activeExts = filters.extension ? filters.extension.split(',') : [];

  const handleToggleExtension = (ext: string) => {
    let updated: string[];
    if (activeExts.includes(ext)) {
      updated = activeExts.filter((item) => item !== ext);
    } else {
      updated = [...activeExts, ext];
    }
    setFilters((prev) => ({ ...prev, extension: updated.join(','), page: 1 }));
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-6 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      
      {/* 💡 Mobile Toggle Header (Hidden on Desktop) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between lg:hidden"
      >
        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Filter Options
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`h-4 w-4 text-neutral-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* 💡 Collapsible Content (Hidden on Mobile unless Open, Always visible on Desktop) */}
      <div className={`${isOpen ? 'block mt-6' : 'hidden'} lg:block lg:mt-0 space-y-6`}>
        
        {/* Extension Filters */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            File Type
          </h3>
          {/* 💡 Converted to a 2-column grid on mobile to save vertical space, 1 column on desktop */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:max-h-48 lg:overflow-y-auto lg:pr-1">
            {fileTypes.map((type) => (
              <label
                key={type.extension}
                className="flex items-center gap-3 text-sm cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={activeExts.includes(type.extension)}
                  onChange={() => handleToggleExtension(type.extension)}
                  className="h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-800 dark:bg-neutral-900 shrink-0"
                />
                <span className="text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition font-mono uppercase text-xs truncate">
                  .{type.extension}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Min Price Filter */}
        <div className="space-y-3 border-t border-neutral-100 dark:border-neutral-900 pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Minimum Price
          </h3>
          <div className="relative rounded-lg shadow-sm">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-neutral-400">
              $
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={filters.minPrice ?? ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minPrice:
                    e.target.value === '' ? undefined : Number(e.target.value),
                  page: 1,
                }))
              }
              className="w-full rounded-lg border border-neutral-200 bg-white py-1.5 pl-7 pr-3 text-xs outline-none transition focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
