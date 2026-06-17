export interface BrowserQuery {
  page: number;
  limit: number;
  minPrice?: number;
  extension?: string;
  search?: string;
}

export interface AssetCreator {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  role: 'SELLER' | string;
  onboardingStatus: 'ACTIVE' | string;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
}

export interface AssetThumbnail {
  id: number;
  url: string;
  width: number;
  height: number;
  storagePath: string;
}

export interface Asset {
  id: number;
  title: string;
  description: string;
  price: string; // Delivered as a string representation of decimal data
  fileExtension: string;
  creatorId: number;
  status: 'PUBLISHED' | string;
  storagePath: string;
  deletedAt: string | null;
  updateAT: string; // Matches the specific JSON column layout case
  creator: AssetCreator;
  thumbnail: AssetThumbnail;
}

/**
 * 1. For the Browser Grid Component (Paginated Feed Wrapper)
 */
export interface AssetBrowserResponse {
  data: Asset[];
  total: number;
}

/**
 * 2. For the Dynamic Asset Detail View Page (Individual Entity Lookups)
 */
export type AssetDetailResponse = Asset;
