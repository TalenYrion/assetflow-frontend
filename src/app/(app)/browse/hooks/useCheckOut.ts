
import { browserApi } from '@/lib/api/browser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCheckOut() {
  const queryClient = useQueryClient();

  return useMutation({
    // Mutation functions take a single argument; pass the raw id number here
    mutationFn: (assetId: number) => browserApi.checkout(assetId),

    onMutate: () => {
      return { toastId: toast.loading('redirecting to stripe...') };
    },

    onSuccess: (data, _variables, context) => {
queryClient.invalidateQueries({queryKey: ['buyer', 'history']})
toast.success('Redirecting...', { id: context?.toastId });
window.location.href = data.url
    },

    onError: (err: Error, _variables, context) => {
      toast.error(err.message || 'Failed to make a purchase', {
        id: context?.toastId,
      });
    },
  });
}
