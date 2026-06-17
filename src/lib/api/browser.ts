import { AssetBrowserResponse, AssetDetailResponse, BrowserQuery } from '@/app/(app)/browse/types';
import apiClient from '../api-client';

export const browserApi = {
  getAllAssets: async (input: BrowserQuery): Promise<AssetBrowserResponse> => {
    const response = await apiClient.get(`asset`, {
      params: {
        page: input.page,
        limit: input.limit,
        search: input.search || undefined,
        minPrice: input.minPrice || undefined,
        extension: input.extension || undefined,
      },
    });
    return response.data;
  },

  getFileTypeLists: async (): Promise<Array<{ extension: string }>> => {
    const response = await apiClient.get('file-type');
    return response.data;
  },

  checkout: async (assetId: number): Promise<{url: string}> => {
	  const response= await apiClient.post('asset/checkout', {
		  assetId
	  })
	  return response.data
  } ,
  getAsset: async (assetId: number): Promise<AssetDetailResponse> => {
    const responce = await apiClient.get(`/asset/${assetId}`);
    return responce.data;
  },


};
