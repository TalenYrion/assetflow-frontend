import { StripePortalType, UpdatePasswordInput, UpdateProfileInput, UpgradeToSellerReponce, UserProfileResponse } from "@/app/(app)/(protected)/dashboard/settings/types"
import apiClient from "../api-client"


export const settingApi = {
	upgradeToSeller: async(): Promise<UpgradeToSellerReponce> => {
		const responce = await apiClient.post('order/upgradeToSeller')
		return responce.data
	},
	getProfile: async (): Promise<UserProfileResponse> => {
		const responce = await apiClient.post('user/profile')
		return responce.data
	},
	getStripePortal: async(): Promise<StripePortalType> => {
		const responce= await apiClient.get('order/stripe-portal')
		return responce.data
	},
updatePassword: async (data: UpdatePasswordInput): Promise<{ message: string }> => {
    const response = await apiClient.patch('user/password', data);
    return response.data;
  },

updateProfile: async (data: UpdateProfileInput): Promise<UserProfileResponse> => {
    const formData = new FormData();

if(data.avatar) formData.append('avatar', data.avatar);
if(data.firstName) formData.append('firstName', data.firstName)

  if (data.lastName !== undefined && data.lastName !== null) formData.append('lastName', data.lastName);
  if (data.bio !== undefined && data.bio !== null) formData.append('bio', data.bio);

    const response = await apiClient.patch('user/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

}
