

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { settingApi } from '@/lib/api/settings';
import { UpdatePasswordFormValues } from '../schema/updatepasswordSchema';

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
    }: {
      data: UpdatePasswordFormValues;
    }) =>{ 
	    const {confirmPassword, ...apiData} = data
	    settingApi.updatePassword(apiData)},
    onMutate: () => {
      return { toastId: toast.loading('Updating user password...') };
    },

    onSuccess: (_data, _variables, context) => {
      toast.success('Password updated successfully', {
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
