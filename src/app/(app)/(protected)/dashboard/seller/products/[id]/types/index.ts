export interface AssetUpdatePreview {
  id: number;
  title: string;
  description: string;
  price: string;
  thumbnailUrl: string | null; // Flattened directly for your <img> src tag
}
