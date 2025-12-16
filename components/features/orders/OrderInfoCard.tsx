'use client';

import Card from '@/components/ui/Card';
import { Order } from '@/types/order';
import { formatDate } from '@/lib/utils';

interface OrderInfoCardProps {
  order: Order;
  trackingNumber?: string;
}

export default function OrderInfoCard({ order, trackingNumber }: OrderInfoCardProps) {
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide dark:text-text-secondary-dark mb-2">PO Number</p>
          <p className="text-base font-bold text-text-primary dark:text-text-primary-dark">{order.poNumber}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide dark:text-text-secondary-dark mb-2">Order Date</p>
          <p className="text-base font-bold text-text-primary dark:text-text-primary-dark">
            {formatDate(order.date, 'long')}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide dark:text-text-secondary-dark mb-2">Shipping Address</p>
          <p className="text-base font-bold text-text-primary dark:text-text-primary-dark">{order.shippingAddress}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide dark:text-text-secondary-dark mb-2">Tracking Number</p>
          <p className="text-base font-bold text-text-primary dark:text-text-primary-dark">
            {trackingNumber || order.trackingNumber || (
              <span className="text-text-muted dark:text-text-muted-dark font-normal">Not available</span>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
}

