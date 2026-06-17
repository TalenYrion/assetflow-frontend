'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { Loader2 } from 'lucide-react';

export default function DashBoard() {
  const router = useRouter();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: authApi.getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (isLoading) return;

    // Boot to login if context details are missing/invalid
    if (!user || error) {
      router.push('/auth/login');
      return;
    }

    const userRole = user.role;

    if (userRole === 'SELLER') {
      router.push('/dashboard/seller');
    } else {
      router.push('/dashboard/buyer');
    }
  }, [user, isLoading, error, router]);

  // Premium, minimalist workspace loader
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <div className="relative flex items-center justify-center">
        {/* Subtle background pulse aura */}
        <div className="absolute h-16 w-16 animate-ping rounded-full bg-blue-500/10 dark:bg-blue-400/5 duration-1000" />
        {/* Crisp thin-stroke spinner */}
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-500 stroke-[1.5]" />
      </div>

      <p className="mt-4 text-[10px] font-bold tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase select-none animate-pulse">
        Preparing Workspace
      </p>
    </div>
  );
}
