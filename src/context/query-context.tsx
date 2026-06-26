'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0, // Immediately marks data as stale so it always refetches
            gcTime: 0,    // Disables caching in memory (Note: use `cacheTime: 0` instead if you are using TanStack Query v4)
            refetchOnWindowFocus: false, // Optional: prevents extra backend hits when switching browser tabs
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
