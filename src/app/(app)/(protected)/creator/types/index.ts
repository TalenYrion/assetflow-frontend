export interface Creator {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  createdAt: string; // ISO Date String
}

export interface CreatorMetrics {
  activeAssetsCount: number;
  totalSalesCount: number;
}

export interface ProfileAsset {
  id: number;
  title: string;
  description: string;
  price: number;
  fileExtension: string;
  thumbnailUrl: string | null;
}

export interface PaginationMetadata {
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface CreatorProfileResponse {
  creator: Creator;
  metrics: CreatorMetrics;
  assets: ProfileAsset[];
  pagination: PaginationMetadata;
}
