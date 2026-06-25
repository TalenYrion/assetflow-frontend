export interface AssetUpdatePreview {
  id: number;
  title: string;
  description: string;
  price: string;
  thumbnail: ThumbnailResponce; 
}

export interface ThumbnailResponce {
	url: string
}
