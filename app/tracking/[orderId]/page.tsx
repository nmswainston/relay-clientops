'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Timeline from '@/components/Timeline';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import OrderInfoCard from '@/components/OrderInfoCard';
import { getOrderById, getTrackingByOrderId } from '@/lib/mockData';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { formatDate, formatDateTime, formatCurrency } from '@/lib/utils';

export default function TrackingPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;
  const { isReady, isLoading } = useAuthGuard();
  
  const [order, setOrder] = useState(getOrderById(orderId));
  const [tracking, setTracking] = useState(getTrackingByOrderId(orderId));
  const [orderNotFound, setOrderNotFound] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    const foundOrder = getOrderById(orderId);
    if (!foundOrder) {
      setOrderNotFound(true);
      return;
    }

    setOrder(foundOrder);
    setOrderNotFound(false);
    setTracking(getTrackingByOrderId(orderId));
  }, [orderId, isReady]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isReady) return null;

  if (orderNotFound || !order) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Order Tracking</h1>
          </div>
        </div>
        <EmptyState
          icon={
            <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="Order Not Found"
          description="The order you're looking for doesn't exist or may have been removed."
          action={
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          }
        />
      </div>
    );
  }

  if (!tracking) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Order Tracking</h1>
          </div>
        </div>

        {/* Order Info Section */}
        <OrderInfoCard order={order} />

        {/* No Tracking State */}
        <EmptyState
          title="Tracking Not Available"
          description="Tracking isn't available yet. This usually appears once the order has shipped."
          action={
            <Link href="/dashboard">
              <Button variant="secondary">Back to Dashboard</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>
        <div className="mt-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Order Tracking</h2>
        </div>
      </div>

      {/* Order Info Section */}
      <OrderInfoCard order={order} trackingNumber={tracking.trackingNumber} />

      {/* Timeline and Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Section */}
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 dark:text-gray-100">Shipping Timeline</h3>
            <Timeline events={tracking.events} currentStatus={tracking.currentStatus} />
          </Card>
        </div>

        {/* Additional Details */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Shipping Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Carrier</p>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">{tracking.carrier}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Delivery</p>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {formatDate(tracking.estimatedDelivery, 'long')}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Items</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{order.items.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Total</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

