'use client';

import React from 'react';
import { UploadCloud, X, FileText, FileArchive } from 'lucide-react';

interface FileDropzoneProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export function FileDropzone({ value, onChange, error }: FileDropzoneProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Generate or clean up object URLs to prevent browser memory leaks
  React.useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    if (value.type.startsWith('image/')) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    onChange(file);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
        Asset Package File
      </label>

      {!value ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[200px] ${
            error
              ? 'border-red-300 bg-red-50/20 dark:border-red-900/50 dark:bg-red-950/10'
              : 'border-neutral-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-700 bg-neutral-50/30 dark:bg-neutral-900/10'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="h-10 w-10 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 flex items-center justify-center text-neutral-500 shadow-sm mb-3">
            <UploadCloud className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
            Drag & drop your file here, or{' '}
            <span className="text-blue-500 hover:underline">browse</span>
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            Supports images, 3D files, ZIPs up to 100MB
          </p>
        </div>
      ) : (
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 bg-white dark:bg-neutral-900/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Visual File Preview Logic */}
            {previewUrl ? (
              <div className="h-14 w-14 rounded-xl border border-neutral-200 overflow-hidden shrink-0 bg-neutral-50">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-14 w-14 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center shrink-0 text-neutral-400">
                {value.name.endsWith('.zip') || value.name.endsWith('.rar') ? (
                  <FileArchive className="h-6 w-6" />
                ) : (
                  <FileText className="h-6 w-6" />
                )}
              </div>
            )}

            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                {value.name}
              </p>
              <p className="text-xs text-neutral-400">
                {formatSize(value.size)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChange(null)}
            className="h-8 w-8 rounded-lg border border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs font-medium text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
