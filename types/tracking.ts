export type TrackingStatus = 
  | 'ordered' 
  | 'processing' 
  | 'shipped' 
  | 'out-for-delivery' 
  | 'delivered';

export interface TrackingEvent {
  status: TrackingStatus;
  timestamp: string;
  location?: string;
  description: string;
}

export interface TrackingInfo {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  currentStatus: TrackingStatus;
  events: TrackingEvent[];
  estimatedDelivery: string;
  shippingAddress: string;
}

