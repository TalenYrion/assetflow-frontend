import { dashboardApi } from '@/lib/api/dashboard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    // Mutation functions take a single argument; pass the raw id number here
    mutationFn: (assetId: number) => dashboardApi.deleteAsset(assetId),

    onMutate: () => {
      return { toastId: toast.loading('Deleting asset package...') };
    },

    onSuccess: (_data, _variables, context) => {
      toast.success('Asset permanently deleted', { id: context?.toastId });

      // Invalidate your asset list cache so the table updates instantly
      queryClient.invalidateQueries({ queryKey: ['seller', 'assets'] });
      queryClient.invalidateQueries({
        queryKey: ['feed-assets'],
      });
    },

    onError: (err: Error, _variables, context) => {
      toast.error(err.message || 'Failed to delete asset', {
        id: context?.toastId,
      });
    },
  });
}
