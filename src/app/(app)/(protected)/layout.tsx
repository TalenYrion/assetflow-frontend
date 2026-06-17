'use client';

import UnauthorizedFallback from '@/components/unauthorized/unauthorizedFallback';
import { useAuth } from '@/context/auth-context';
import React from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-blue-600 dark:border-neutral-800 dark:border-t-blue-500" />

        <p className="mt-4 text-xs font-semibold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase antialiased">
          Verifying Session
        </p>
      </div>
    );
  }

  if (!user) return <UnauthorizedFallback />;

  return <>{children}</>;
}
