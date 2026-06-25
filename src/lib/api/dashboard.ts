import {
  BuyerOrderHistoryResponse,
  SellerDashboardResponse,
} from '@/app/(app)/(protected)/dashboard/types';
import apiClient from '../api-client';
import {
  AssetUploadResponse,
  CreateAssetInput,
} from '@/app/(app)/(protected)/dashboard/seller/upload/types';
import { SellerAssetsListResponse } from '@/app/(app)/(protected)/dashboard/seller/products/types';
import { AssetUpdatePreview } from '@/app/(app)/(protected)/dashboard/seller/products/[id]/types';

export const dashboardApi = {
  getBuyerHistory: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<BuyerOrderHistoryResponse> => {
    const responce = await apiClient.get(
      `/order/buyer-history?page=${page}&limit=${limit}`,
    );
    return responce.data;
  },

  getSellerDashboard: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<SellerDashboardResponse> => {
    const responce = await apiClient.get(
      `/order/seller-dashboard?page=${page}&limit=${limit}`,
    );
    return responce.data;
  },

  uploadAsset: async (
    input: CreateAssetInput,
  ): Promise<AssetUploadResponse> => {
    const formData = new FormData();

    formData.append('title', input.title);
    formData.append('description', input.description);
    formData.append('price', input.price);
    formData.append('file', input.file);

    // Append the optional thumbnail file if it was provided by the user
    if (input.thumbnailFile) {
      formData.append('thumbnailFile', input.thumbnailFile);
    }

    const responce = await apiClient.post('asset', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return responce.data;
  },
  getSellerAssets: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<SellerAssetsListResponse> => {
    const responce = await apiClient.get(
      `/asset/mine?page=${page}&limit=${limit}`,
    );
    return responce.data;
  },

  deleteAsset: async (assetsId: number): Promise<void> => {
    const responce = await apiClient.delete(`/asset/${assetsId}`);
    return responce.data;
  },

  publishAsset: async (assetId: number): Promise<void> => {
    // Switched from .get to .patch to correctly signal a state mutation
    const response = await apiClient.patch(`/asset/status/${assetId}`);
    return response.data;
  },

  updateAsset: async (
    assetId: number,
    input: Partial<CreateAssetInput>,
  ): Promise<AssetUploadResponse> => {
    const formData = new FormData();

    if (input.title) formData.append('title', input.title);
    if (input.description) formData.append('description', input.description);
    if (input.price) formData.append('price', input.price);
    if (input.file) formData.append('file', input.file);

    const responce = await apiClient.patch(`asset/${assetId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return responce.data;
  },

  getAsset: async (assetId: number): Promise<AssetUpdatePreview> => {
    const responce = await apiClient.get(`/asset/${assetId}`);
    return responce.data;
  },
  downlaodAsset: async (assetId: number): Promise<{ downloadUrl: string }> => {
    const response = await apiClient.get(`asset/${assetId}/download`);
    return response.data;
  },
};
