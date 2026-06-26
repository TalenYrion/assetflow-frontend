import { useAuth } from "@/context/auth-context"
import { authApi } from "@/lib/api/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useSignOut () {
	const {refreshUser} = useAuth();
	const router = useRouter()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: authApi.logout,
		onSuccess:async () => {
toast.success('logged out Successfully')
await refreshUser()
      queryClient.invalidateQueries({ queryKey: ['seller'] });
      queryClient.invalidateQueries({
        queryKey: ['feed-assets'],
      });
      queryClient.invalidateQueries({ queryKey: ['buyer'] });
      queryClient.invalidateQueries({
        queryKey: ['file-type'],
      });
		},
	onError: (error: Error) => {
      toast.error(error.message || 'Failed to sign out. Please try again.');
    },	
	})

}
