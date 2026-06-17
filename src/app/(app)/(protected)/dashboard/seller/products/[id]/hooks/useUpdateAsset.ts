import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboard';
import { toast } from 'sonner';
import { UpdateAssetFormValues } from '../schema/updateAssetAchema';
import { useRouter } from 'next/navigation';

export function useUpdateAsser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      assetId,
      data,
    }: {
      assetId: number;
      data: UpdateAssetFormValues;
    }) => dashboardApi.updateAsset(assetId, data),
    onMutate: () => {
      return { toastId: toast.loading('Updating asset visibility...') };
    },

    onSuccess: (_data, _variables, context) => {
      toast.success('Asset updated successfully', {
        id: context?.toastId,
      });

      // Instantly updates your inventory list view
      queryClient.invalidateQueries({ queryKey: ['seller', 'assets'] });
      queryClient.invalidateQueries({
        queryKey: ['feed-assets'],
      });

      router.push('/dashboard/seller/products');
    },

    onError: (err: Error, _variables, context) => {
      toast.error(err.message || 'Failed to update asset', {
        id: context?.toastId,
      });
    },
  });
}
