'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Timeline from '@/components/Timeline';
import { getOrderById, getTrackingByOrderId } from '@/lib/mockData';

export default function TrackingPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [order, setOrder] = useState(getOrderById(orderId));
  const [tracking, setTracking] = useState(getTrackingByOrderId(orderId));

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (!auth) {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);

    if (!order) {
      router.push('/dashboard');
      return;
    }

    if (!tracking && order.trackingNumber) {
      // If tracking info doesn't exist but order has tracking number,
      // we could create a basic tracking info
      // For now, just show a message
    }
  }, [orderId, router, order, tracking]);

  if (!isAuthenticated || !order) {
    return null;
  }

  if (!tracking) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center dark:bg-slate-900 dark:shadow-slate-950/40">
            <p className="text-gray-600 dark:text-gray-300">Tracking information not available for this order.</p>
            <Link href="/dashboard" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
              Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Order Tracking</h2>
            <p className="text-gray-600 mt-2 dark:text-gray-300">PO Number: {order.poNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 dark:bg-slate-900 dark:shadow-slate-950/40">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 dark:text-gray-100">Shipping Timeline</h3>
              <Timeline events={tracking.events} currentStatus={tracking.currentStatus} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 dark:bg-slate-900 dark:shadow-slate-950/40">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Shipping Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tracking Number</p>
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100">{tracking.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Carrier</p>
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100">{tracking.carrier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Delivery</p>
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {new Date(tracking.estimatedDelivery).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 dark:bg-slate-900 dark:shadow-slate-950/40">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Shipping Address</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{tracking.shippingAddress}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 dark:bg-slate-900 dark:shadow-slate-950/40">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Items</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{order.items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Total</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    ${order.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

