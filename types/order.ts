export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  poNumber: string;
  date: string;
  status: 'ordered' | 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  trackingNumber?: string;
}

