import { CreatorProfileResponse } from "@/app/(app)/(protected)/creator/types";
import apiClient from "../api-client";

export const creatorApi = {
  getCreatorProfile: async (userId: number, page: number, limit: number): Promise<CreatorProfileResponse> => {
    const response = await apiClient.get<CreatorProfileResponse>(`asset/profile/${userId}`, {
      params: { page, limit } // 💡 Shortened syntax
    });
    
    return response.data; 
  }
};
