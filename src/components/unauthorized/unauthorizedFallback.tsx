import React from 'react';
import { Lock } from 'lucide-react';

export default function UnauthorizedFallback() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md text-center">
        {/* Modern Secure Lock Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 shadow-sm">
          <Lock className="h-8 w-8" /> {/* 👈 Replaced with Lucide Lock */}
        </div>

        {/* Text Content */}
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Sign In Required
        </h2>

        <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 max-w-xs mx-auto">
          Please log in to your account to view this page, access your
          dashboard, or manage creator profiles.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          {/* Main Action */}
          <a
            href="/auth/login"
            className="flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Sign In to Continue
          </a>

          {/* Secondary Action */}
          <a
            href="/"
            className="flex w-full justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            Back to Home
          </a>
        </div>

        {/* Support Footer */}
        <p className="mt-10 text-xs text-neutral-400 dark:text-neutral-500">
          Trouble logging in?{' '}
          <a
            href="/support"
            className="underline hover:text-neutral-600 dark:hover:text-neutral-300"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
