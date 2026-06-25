import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { toast } from 'sonner';
// import { useRouter } from 'next/navigation';
import { UpdateAssetFormValues } from '../schema/updateAssetAchema';
import { dashboardApi } from '@/lib/api/dashboard';

// Mocking external hooks/toast for the isolated file
const toast = {
  loading: (s: string) => s,
  success: (s: string, o: any) => {},
  error: (s: string, o: any) => {},
};
const useRouter = () => ({ push: (s: string) => {} });

export function useUpdateAsset() {
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
      return { toastId: toast.loading('Updating asset...') };
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
