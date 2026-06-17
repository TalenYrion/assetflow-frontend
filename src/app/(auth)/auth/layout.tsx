import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 font-sans antialiased transition-colors duration-200 relative">
      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ModeToggle />
      </div>

      {/* Left Column: Branding Panel (Centered & Balanced) */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-neutral-50 dark:bg-neutral-900 p-16 flex-col justify-center overflow-hidden border-r border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent dark:from-blue-600/20 pointer-events-none" />

        {/* Balanced Content Block */}
        <div className="relative z-10 space-y-6 max-w-sm">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-neutral-900 dark:text-neutral-50">
            <div className="p-2 bg-blue-600 rounded-xl shadow-md shadow-blue-500/10">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span>AssetFlow</span>
          </div>

          {/* Core Tagline */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold tracking-tight leading-snug text-neutral-900 dark:text-neutral-50">
              Secure digital asset infrastructure.
            </h1>
            <p className="text-sm font-medium leading-relaxed text-neutral-500 dark:text-neutral-400">
              The professional layer for lightning-fast digital asset
              management, licensing, and distribution.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Main Form Area */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Mobile Logo Only */}
        <div className="flex lg:hidden items-center gap-2 font-bold text-lg tracking-tight absolute top-8 left-8">
          <div className="p-2 bg-blue-600 rounded-xl">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span>AssetFlow</span>
        </div>

        {/* Content Injection */}
        <div className="w-full max-w-md mx-auto space-y-6">{children}</div>
      </div>
    </div>
  );
}
