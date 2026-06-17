

import { settingApi } from '@/lib/api/settings';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useGetProfile() {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: () => settingApi.getProfile()
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(
        query?.error.message || "Error while loading  user profile",
      );
    }
  }, [query.isError, query.error]);

  return query;
}
