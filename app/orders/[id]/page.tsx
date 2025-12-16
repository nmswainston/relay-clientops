'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import StatusBadge from '@/components/features/orders/StatusBadge';
import OrderItem from '@/components/features/orders/OrderItem';
import { getOrderById } from '@/lib/mockData';
import { OrderItem as OrderItemType } from '@/types/order';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { formatDate, formatCurrency } from '@/lib/utils';

interface SelectedItem {
  item: OrderItemType;
  quantity: number;
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { isReady, isLoading } = useAuthGuard();
  
  const [order, setOrder] = useState(getOrderById(orderId));
  const [selectedItems, setSelectedItems] = useState<Record<string, SelectedItem>>({});
  const [success, setSuccess] = useState(false);
  const [orderNotFound, setOrderNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady) return;

    const foundOrder = getOrderById(orderId);
    if (!foundOrder) {
      setOrderNotFound(true);
      return;
    }

    setOrder(foundOrder);
    setOrderNotFound(false);

    // Initialize selected items with original quantities
    const initial: Record<string, SelectedItem> = {};
    foundOrder.items.forEach((item) => {
      initial[item.id] = {
        item,
        quantity: item.quantity,
      };
    });
    setSelectedItems(initial);
  }, [orderId, isReady]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isReady) return null;

  if (orderNotFound || !order) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <Link
            href="/orders"
            className="text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 text-sm font-medium mb-4 inline-block transition-colors"
          >
            ← Back to Orders
          </Link>
        </div>
        <EmptyState
          icon={
            <svg className="w-16 h-16 text-text-muted dark:text-text-muted-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="Order Not Found"
          description="The order you're looking for doesn't exist or may have been removed."
          action={
            <Link href="/orders">
              <Button>View All Orders</Button>
            </Link>
          }
        />
      </div>
    );
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
      setError('Please select at least one item to reorder.');
      setTimeout(() => setError(null), 5000);
      return;
    }

    setError(null);
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
      {error && (
        <div className="mb-6 bg-error-50 border-2 border-error-200 rounded-xl p-4 dark:bg-error-900/20 dark:border-error-800 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-error-600 dark:text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-error-800 font-semibold dark:text-error-300">
              {error}
            </p>
          </div>
        </div>
      )}
      {success && (
        <div className="mb-6 bg-success-50 border-2 border-success-200 rounded-xl p-4 dark:bg-success-900/20 dark:border-success-800 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-success-800 font-semibold dark:text-success-300">
              Reorder successful! Your items have been added to cart.
            </p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <Link
          href="/orders"
          className="text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 text-sm font-medium mb-4 inline-block transition-colors"
        >
          ← Back to Orders
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark mb-2">Order Details</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-text-secondary dark:text-text-secondary-dark">
            <span>PO Number: <span className="font-semibold text-text-primary dark:text-text-primary-dark">{order.poNumber}</span></span>
            <span className="hidden sm:inline">•</span>
            <span>Date: <span className="font-semibold text-text-primary dark:text-text-primary-dark">{formatDate(order.date, 'long')}</span></span>
            <span className="hidden sm:inline">•</span>
            <StatusBadge status={order.status} />
          </div>
        </div>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <h3 className="text-lg font-semibold text-text-primary mb-6 dark:text-text-primary-dark">Order Items</h3>
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
            </Card>
          </div>

          <aside>
            <Card className="sticky top-24">
              <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-6">Order Summary</h3>
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                PO: {order.poNumber}
              </p>
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                Shipping to: {order.shippingAddress}
              </p>
              <hr className="my-4 border-border dark:border-border-dark" />
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary dark:text-text-secondary-dark">Items selected</span>
                  <span className="font-semibold text-text-primary dark:text-text-primary-dark">{selectedCount}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-border dark:border-border-dark">
                  <span className="text-text-primary dark:text-text-primary-dark">Estimated total</span>
                  <span className="text-text-primary dark:text-text-primary-dark">{formatCurrency(estimatedTotal)}</span>
                </div>
              </div>
              <Button 
                onClick={handleReorder}
                disabled={selectedCount === 0}
                className="w-full mt-6"
              >
                Reorder Selected Items
              </Button>
            </Card>
          </aside>
        </div>
    </>
  );
}

