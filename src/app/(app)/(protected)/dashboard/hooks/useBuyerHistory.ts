import { dashboardApi } from '@/lib/api/dashboard';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useBuyerHistory(page: number = 1, limit: number = 10) {
  const query = useQuery({
    queryKey: ['buyer', 'history', { page, limit }],
    queryFn: () => dashboardApi.getBuyerHistory(page, limit),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(
        query?.error.message || "Error while loading buyer's order history",
      );
    }
  }, [query.isError, query.error]);

  return query;
}
