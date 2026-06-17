export interface UploadThumbnail {
  id: number;
  url: string;
}

export interface UploadedAsset {
  id: number;
  title: string;
  description: string;
  price: string;
  fileExtension: string;
  status: 'DRAFT' | 'PUBLISHED';
  thumbnail: UploadThumbnail | null;
}

export interface AssetUploadResponse {
  message: string;
  asset: UploadedAsset;
}

export interface CreateAssetInput {
  title: string;
  description: string;
  price: string;
  file: File;
}
