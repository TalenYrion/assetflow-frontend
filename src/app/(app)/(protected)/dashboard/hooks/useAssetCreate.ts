import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AssetFormValues } from '../schema/assetSchema';
import { dashboardApi } from '@/lib/api/dashboard';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useAssetCreate() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AssetFormValues) => dashboardApi.uploadAsset(data),
    onMutate: () => {
      return { toastId: toast.loading('Uploading Asset...') };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success('Asset uploaded successfully', { id: context?.toastId });

      // Force React Query to refetch the seller lists so the new item shows up
      queryClient.invalidateQueries({ queryKey: ['seller'] });
      queryClient.invalidateQueries({
        queryKey: ['feed-assets'],
      });

      router.push('/dashboard/seller/products');
    },
    onError: (err: Error, _variables, context) => {
      toast.error(err.message || 'Error while uploading asset', {
        id: context?.toastId,
      });
    },
  });
}
