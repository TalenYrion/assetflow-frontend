import { dashboardApi } from '@/lib/api/dashboard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useToggleAssetStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assetId: number) => dashboardApi.publishAsset(assetId),

    onMutate: () => {
      return { toastId: toast.loading('Updating asset visibility...') };
    },

    onSuccess: (_data, _variables, context) => {
      toast.success('Asset status updated successfully', {
        id: context?.toastId,
      });

      // Instantly updates your inventory list view
      queryClient.invalidateQueries({ queryKey: ['seller', 'assets'] });
      queryClient.invalidateQueries({
        queryKey: ['feed-assets'],
      });
    },

    onError: (err: Error, _variables, context) => {
      toast.error(err.message || 'Failed to update asset status', {
        id: context?.toastId,
      });
    },
  });
}
