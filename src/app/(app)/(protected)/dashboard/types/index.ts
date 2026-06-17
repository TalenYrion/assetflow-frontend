export interface Thumbnail {
  url: string;
}

export interface Asset {
  id: number;
  title: string;
  description: string;
  fileExtension: string;
  thumbnail: Thumbnail | null; // Can be null if an asset doesn't have an image
}

export interface Order {
  id: number;
  pricePaid: string; // Keep as string since database decimals come back as strings
  transactionId: string;
  status: 'PENDING' | 'SUCCESS' | 'REFUNDED'; // Strict union type instead of a generic string
  createdAt: string;
  asset: Asset;
}

// This matches your top-level paginated response structure
export interface BuyerOrderHistoryResponse {
  data: Order[];
  total: number;
}

export interface SellerMetrics {
  totalRevenue: number;
  totalSalesCount: number;
  netEarnings: number;
}

export interface SellerAsset {
  id: number;
  title: string;
  thumbnailUrl: string | null;
  fileExtension: string;
}

export interface SellerBuyer {
  id: number;
  name: string;
  avatarUrl: string | null;
}

export interface Sale {
  id: number;
  transactionId: string;
  pricePaid: string;
  platformFee: string;
  createdAt: string;
  asset: SellerAsset;
  buyer: SellerBuyer;
}

export interface SellerDashboardResponse {
  metrics: SellerMetrics;
  sales: Sale[];
  total?: number;
}
