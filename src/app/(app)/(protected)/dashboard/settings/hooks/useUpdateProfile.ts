
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UpdateProfileFormValues } from '../schema/updateProfileSchema';
import { settingApi } from '@/lib/api/settings';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
    }: {
      data: UpdateProfileFormValues;
    }) => settingApi.updateProfile(data),
    onMutate: () => {
      return { toastId: toast.loading('Updating user profile...') };
    },

    onSuccess: (_data, _variables, context) => {
      toast.success('Profile updated successfully', {
        id: context?.toastId,
      });

      // Instantly updates your inventory list view
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },

    onError: (err: Error, _variables, context) => {
      toast.error(err.message || 'Failed to update User', {
        id: context?.toastId,
      });
    },
  });
}
