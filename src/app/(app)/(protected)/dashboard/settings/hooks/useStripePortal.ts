


import { settingApi } from '@/lib/api/settings';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useStripePortal() {
  return useMutation({
    mutationFn: () => settingApi.getStripePortal(),
    
    onMutate: () => {
      return { toastId: toast.loading('Generating secure Stripe link...') };
    },

    onSuccess: (data, _variables, context) => {
      toast.dismiss(context?.toastId);
      
      // Instantly redirect the vendor to their secure external Stripe dashboard
      if (data?.url) {
        window.location.href = data.url;
      }
    },

    onError: (err: Error, _variables, context) => {
      toast.error(err.message || 'Failed to launch Stripe dashboard', {
        id: context?.toastId,
      });
    },
  });
}
