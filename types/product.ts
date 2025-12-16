// Product type reserved for future product catalog feature
// Currently unused but kept for planned functionality
export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  description?: string;
  category?: string;
  inStock: boolean;
  imageUrl?: string;
}

