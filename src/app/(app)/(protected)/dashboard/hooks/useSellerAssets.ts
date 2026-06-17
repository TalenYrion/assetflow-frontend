
import { dashboardApi } from '@/lib/api/dashboard';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useSellerAssets(page: number = 1, limit: number = 10) {
  const query = useQuery({
    queryKey: ['seller', 'assets', { page, limit }],
    queryFn: () => dashboardApi.getSellerAssets(page, limit),
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(
        query?.error.message || "Error while loading seller assets",
      );
    }
  }, [query.isError, query.error]);

  return query;
}
