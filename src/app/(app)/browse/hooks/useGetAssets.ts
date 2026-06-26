import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { BrowserQuery } from '../schema/browserSchema';
import { browserApi } from '@/lib/api/browser';

export function useGetAssets(input: BrowserQuery) {
  const query = useQuery({
    queryKey: ['feed-assets', input],
    queryFn: () => browserApi.getAllAssets(input),
    
    // Disable caching:
    gcTime: 0, // Note: If you are using React Query v4 or older, change this to `cacheTime: 0`
    staleTime: 0, 
    
     placeholderData: (previousData) => previousData, // Optional: Remove this if you don't want old data lingering on screen during a refetch
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(query?.error.message || 'Error while loading Assets');
    }
  }, [query.isError, query.error]);

  return query;
}
