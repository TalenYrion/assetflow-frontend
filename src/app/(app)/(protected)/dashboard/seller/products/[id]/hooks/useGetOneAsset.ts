import { dashboardApi } from '@/lib/api/dashboard';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useGetAnAsset(assetId: number) {
  const query = useQuery({
    queryKey: ['seller', 'assets', assetId],
    queryFn: () => dashboardApi.getAsset(assetId),
    enabled: !!assetId,
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(query?.error.message || 'Error while loading seller asset');
    }
  }, [query.isError, query.error]);

  return query;
}
