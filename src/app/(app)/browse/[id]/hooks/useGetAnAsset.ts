
import { browserApi } from '@/lib/api/browser';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useGetAnAsset(assetId: number) {
  const query = useQuery({
    queryKey: ['asset-detail', {assetId}],
    queryFn: () => browserApi.getAsset(assetId),
    enabled: !!assetId,
staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(query?.error.message || 'Error while loading asset');
    }
  }, [query.isError, query.error]);

  return query;
}
