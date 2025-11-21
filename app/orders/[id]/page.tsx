'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import OrderItem from '@/components/OrderItem';
import { getOrderById } from '@/lib/mockData';
import { OrderItem as OrderItemType } from '@/types/order';
import { useAuthGuard } from '@/hooks/useAuthGuard';

interface SelectedItem {
  item: OrderItemType;
  quantity: number;
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const isReady = useAuthGuard();
  
  const [order, setOrder] = useState(getOrderById(orderId));
  const [selectedItems, setSelectedItems] = useState<Record<string, SelectedItem>>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    if (!order) {
      // Order not found, redirect to orders list
      router.push('/orders');
      return;
    }

    // Initialize selected items with original quantities
    const initial: Record<string, SelectedItem> = {};
    order.items.forEach((item) => {
      initial[item.id] = {
        item,
        quantity: item.quantity,
      };
    });
    setSelectedItems(initial);
  }, [orderId, router, order, isReady]);

  if (!isReady || !order) {
    return null;
  }

  const handleToggleItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const current = prev[itemId];
      if (current) {
        // If already selected, deselect by setting quantity to 0
        return {
          ...prev,
          [itemId]: { ...current, quantity: 0 },
        };
      }
      return prev;
    });
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems((prev) => {
      const current = prev[itemId];
      if (current) {
        return {
          ...prev,
          [itemId]: { ...current, quantity },
        };
      }
      return prev;
    });
  };

  const isItemSelected = (itemId: string) => {
    return selectedItems[itemId]?.quantity > 0;
  };

  const handleReorder = () => {
    const itemsToReorder = Object.values(selectedItems).filter(
      (selected) => selected.quantity > 0
    );

    if (itemsToReorder.length === 0) {
      alert('Please select at least one item to reorder.');
      return;
    }

    // Mock reorder - in real app, this would make an API call
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const estimatedTotal = Object.values(selectedItems)
    .filter((selected) => selected.quantity > 0)
    .reduce((sum, selected) => sum + selected.item.price * selected.quantity, 0);

  const selectedCount = Object.values(selectedItems).filter(
    (selected) => selected.quantity > 0
  ).length;

  return (
    <>
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 dark:bg-green-900/20 dark:border-green-800">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-800 font-medium dark:text-green-300">
              Reorder successful! Your items have been added to cart.
            </p>
          </div>
        </div>
      )}

      <div className="mb-6">
          <Link
            href="/orders"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-4 inline-block"
          >
            ← Back to Orders
          </Link>
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Order Details</h2>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-600 dark:text-gray-300">
              <span>PO Number: <span className="font-semibold text-gray-900 dark:text-gray-100">{order.poNumber}</span></span>
              <span className="hidden sm:inline">•</span>
              <span>Date: <span className="font-semibold text-gray-900 dark:text-gray-100">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></span>
              <span className="hidden sm:inline">•</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'shipped' || order.status === 'out-for-delivery' ? 'bg-blue-100 text-blue-800' :
                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status.replace('-', ' ')}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6 dark:bg-slate-900 dark:shadow-slate-950/40">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <OrderItem
                    key={item.id}
                    item={item}
                    quantity={selectedItems[item.id]?.quantity || 0}
                    isSelected={isItemSelected(item.id)}
                    onToggle={() => handleToggleItem(item.id)}
                    onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                  />
                ))}
              </div>
            </div>
          </div>

          <aside className="bg-white rounded-lg shadow-md p-6 space-y-4 dark:bg-slate-900 dark:shadow-slate-950/40">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Order Summary</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              PO: {order.poNumber}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Shipping to: {order.shippingAddress}
            </p>
            <hr className="my-3 border-gray-200 dark:border-slate-700" />
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Items selected</span>
              <span className="text-gray-900 dark:text-gray-100">{selectedCount}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-900 dark:text-gray-100">Estimated total</span>
              <span className="text-gray-900 dark:text-gray-100">${estimatedTotal.toFixed(2)}</span>
            </div>
            <Button 
              onClick={handleReorder}
              disabled={selectedCount === 0}
              className="w-full mt-4"
            >
              Reorder Selected Items
            </Button>
          </aside>
        </div>
    </>
  );
}

