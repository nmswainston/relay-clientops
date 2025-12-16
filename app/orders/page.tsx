'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { mockOrders } from '@/lib/mockData';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Order } from '@/types/order';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import StatusBadge from '@/components/StatusBadge';
import DemoBadge from '@/components/DemoBadge';
import Card from '@/components/ui/Card';

type StatusFilter = 'all' | Order['status'];

export default function OrdersPage() {
  const { isReady, isLoading } = useAuthGuard();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Hooks must be called before early returns
  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      // Status filter
      if (statusFilter !== 'all' && order.status !== statusFilter) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesPO = order.poNumber.toLowerCase().includes(query);
        const matchesOrderId = order.id.toLowerCase().includes(query);
        return matchesPO || matchesOrderId;
      }

      return true;
    });
  }, [statusFilter, searchQuery]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isReady) return null;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Orders</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Select an order to reorder items or view details</p>
        <DemoBadge />
      </div>

      {/* Filters and Search */}
      <Card className="mb-6" padding="md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200">
              Search Orders
            </label>
            <Input
              id="search"
              type="text"
              placeholder="Search by PO number or order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status-filter" className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200">
              Filter by Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-gray-100 transition-colors hover:border-gray-400 dark:hover:border-slate-500"
            >
              <option value="all">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="out-for-delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          title={mockOrders.length === 0 ? 'No orders yet' : 'No orders match your filters'}
          description={
            mockOrders.length === 0
              ? 'Your orders will appear here once you place an order.'
              : 'Try adjusting your search or filter criteria.'
          }
          action={
            (statusFilter !== 'all' || searchQuery.trim()) ? (
              <Button
                variant="secondary"
                onClick={() => {
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredOrders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block"
            >
              <Card hover className="transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{order.poNumber}</p>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(order.date, 'long')} • {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatCurrency(order.total)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">View details →</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

