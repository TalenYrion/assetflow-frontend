import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { BrowserQuery } from '../schema/browserSchema';
import { browserApi } from '@/lib/api/browser';

export function useGetAssets(input: BrowserQuery) {
  const query = useQuery({
    queryKey: ['feed-assets', input],
    queryFn: () => browserApi.getAllAssets(input),
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(query?.error.message || 'Error while loading Assets');
    }
  }, [query.isError, query.error]);

  return query;
}
