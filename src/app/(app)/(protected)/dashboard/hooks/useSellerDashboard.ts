
import { dashboardApi } from '@/lib/api/dashboard';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useSellerDashboard(page: number = 1, limit: number = 10) {
  const query = useQuery({
    queryKey: ['seller', 'dashboard', { page, limit }],
    queryFn: () => dashboardApi.getSellerDashboard(page, limit),
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(
        query?.error.message || "Error while loading seller's dashboard",
      );
    }
  }, [query.isError, query.error]);

  return query;
}
