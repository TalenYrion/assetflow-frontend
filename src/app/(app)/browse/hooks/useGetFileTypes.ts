import { browserApi } from '@/lib/api/browser';
import { dashboardApi } from '@/lib/api/dashboard';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useGetFileTYpes() {
  const query = useQuery({
    queryKey: ['file-types'],
    queryFn: () => browserApi.getFileTypeLists(),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(query?.error.message || 'Error while loading file types');
    }
  }, [query.isError, query.error]);

  return query;
}
