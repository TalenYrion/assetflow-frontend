export interface AssetThumbnail {
  id: number;
  url: string;
  width: number;
  height: number;
  storagePath: string;
}

export interface SellerAssetItem {
  id: number;
  title: string;
  description: string;
  price: string; // Keeps string representation for decimal accuracy
  fileExtension: string;
  thumbnail: AssetThumbnail | null; // Nullable if still processing
  creatorId: number;
  status: 'DRAFT' | 'PUBLISHED';
  storagePath: string;
  deletedAt: string | null;
  updateAT: string; // Matches your backend's specific casing quirk
}

export interface SellerAssetsListResponse {
  data: SellerAssetItem[];
  total: number; // Used for inventory list pagination counters
}
