
import { dashboardApi } from '@/lib/api/dashboard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDowloadAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assetId: number) => dashboardApi.downlaodAsset(assetId),

    onMutate: () => {
      return { toastId: toast.loading('Generating download Link...') };
    },
    onSuccess: (data, _variables, context) => {
try {
        // 1. Create a hidden anchor element
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        
        // 2. Force the browser to download instead of opening in a new tab
        link.setAttribute('download', ''); 
        
        // 3. Append, trigger click, and clean up the DOM (required for Firefox compatibility)
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 4. Update the active loader toast to success
        toast.success('Download started successfully!', {
          id: context?.toastId,
        });
      } catch (err) {
        toast.error('Failed to trigger download file execution', {
          id: context?.toastId,
        });
      }
    },

    onError: (err: Error, _variables, context) => {
      toast.error(err.message || 'Failed to update asset status', {
        id: context?.toastId,
      });
    },
  });
}
