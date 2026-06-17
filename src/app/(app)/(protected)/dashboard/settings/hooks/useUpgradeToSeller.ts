
import { settingApi } from '@/lib/api/settings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpgradeToSeller() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => settingApi.upgradeToSeller(),

    onMutate: () => {
      return { toastId: toast.loading('Updating user status...') };
    },

    onSuccess: (data, _variables, context) => {
      toast.success('User status updated successfully', {
        id: context?.toastId,
      });

      queryClient.invalidateQueries({ queryKey: ['profile'] });
if (data?.onboardingUrl) {
        window.location.href = data.onboardingUrl;
      } else {
        toast.success('User status updated successfully');
      }
    },

    onError: (err: Error, _variables, context) => {
      toast.error(err.message || 'Failed to update user status', {
        id: context?.toastId,
      });
    },
  });
}
