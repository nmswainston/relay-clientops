'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import OrderItem from '@/components/OrderItem';
import { getOrderById } from '@/lib/mockData';
import { OrderItem as OrderItemType } from '@/types/order';

interface SelectedItem {
  item: OrderItemType;
  quantity: number;
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [order, setOrder] = useState(getOrderById(orderId));
  const [selectedItems, setSelectedItems] = useState<Record<string, SelectedItem>>({});

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (!auth) {
      router.push('/login');
      return;
    }
    setIsAuthenticated(true);

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
  }, [orderId, router, order]);

  if (!isAuthenticated || !order) {
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
    alert(`Reorder initiated for ${itemsToReorder.length} item(s). This would create a new order in a real application.`);
    router.push('/dashboard');
  };

  const total = Object.values(selectedItems)
    .filter((selected) => selected.quantity > 0)
    .reduce((sum, selected) => sum + selected.item.price * selected.quantity, 0);

  const selectedCount = Object.values(selectedItems).filter(
    (selected) => selected.quantity > 0
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 dark:bg-slate-900 dark:shadow-slate-950/40">
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

        <div className="bg-white rounded-lg shadow-md p-6 dark:bg-slate-900 dark:shadow-slate-950/40">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2 dark:text-gray-100">
                Total: ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <Button
              onClick={handleReorder}
              disabled={selectedCount === 0}
              size="lg"
              className="w-full sm:w-auto"
            >
              Reorder Selected Items
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

