import { useQuery } from '@tanstack/react-query';
import { creatorApi } from '@/lib/api/creator'; // Adjust path to your api location
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useCreatorProfile(userId: number, page: number = 1, limit: number = 10) {
  const query = useQuery({
    queryKey: ['creator', 'profile', userId, { page, limit }],
    queryFn: () => creatorApi.getCreatorProfile(userId, page, limit),
    enabled: !!userId, // Prevent execution if userId is undefined/0
    staleTime: 60000,  // Cache profile data for 1 minute before considering it stale
  });

  useEffect(() => {
    if (query.isError) {
      toast.error(
        query?.error instanceof Error 
          ? query.error.message 
          : "Failed to load creator profile"
      );
    }
  }, [query.isError, query.error]);

  return query;
}
