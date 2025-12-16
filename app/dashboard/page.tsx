'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
import StatusBadge from '@/components/features/orders/StatusBadge';
import DemoBadge from '@/components/shared/DemoBadge';
import { mockOrders } from '@/lib/mockData';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { formatDate, formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const { isReady, isLoading } = useAuthGuard();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isReady) return null;

  const recentOrders = mockOrders.slice(0, 3);
  const ordersWithTracking = recentOrders.filter(order => order.trackingNumber);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark mb-2">Dashboard</h1>
        <p className="text-text-secondary dark:text-text-secondary-dark mb-4">
          Overview of your orders and quick access to reordering, tracking, and support
        </p>
        <DemoBadge />
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card hover>
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
          <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-1.5">Quick Reorder</h3>
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-4">
            Reorder from your recent purchase orders.
          </p>
          <Link href="/orders">
            <Button className="w-full" size="sm">View Past Orders</Button>
          </Link>
        </Card>
        <Card hover>
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-1.5">Track Orders</h3>
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-4">
            Check real-time status for active shipments.
          </p>
          {ordersWithTracking[0] ? (
            <Link href={`/tracking/${ordersWithTracking[0].id}`}>
              <Button className="w-full" size="sm" variant="secondary">
                Track Latest Order
              </Button>
            </Link>
          ) : (
            <Button className="w-full" size="sm" variant="secondary" disabled>
              No Active Shipments
            </Button>
          )}
        </Card>
        <Card hover>
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
          </div>
          <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-1.5">Ask Relay Assistant</h3>
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-4">
            Get help with compatibility, stock, and more.
          </p>
          <Button
            className="w-full"
            size="sm"
            variant="outline"
            onClick={() => {
              const event = new CustomEvent('openRelayAssistant');
              window.dispatchEvent(event);
            }}
          >
            Open Relay Assistant
          </Button>
        </Card>
      </div>

      {/* Recent Orders Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary dark:text-text-primary-dark">Recent Orders</h2>
          {recentOrders.length > 0 && (
            <Link
              href="/orders"
              className="text-sm font-medium text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 transition-colors"
            >
              View all →
            </Link>
          )}
        </div>
        {recentOrders.length === 0 ? (
          <EmptyState
            title="No recent orders"
            description="Your recent orders will appear here once you place an order."
            action={
              <Link href="/orders">
                <Button variant="secondary">View All Orders</Button>
              </Link>
            }
          />
        ) : (
          <div className="bg-surface rounded-xl shadow-sm border border-border-subtle overflow-hidden dark:bg-surface-dark dark:border-border-subtle-dark">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border dark:divide-border-dark">
                <thead className="bg-surface-elevated dark:bg-surface-elevated-dark">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider dark:text-text-primary-dark">
                      PO Number
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider dark:text-text-primary-dark">
                      Order Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider dark:text-text-primary-dark">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-text-primary uppercase tracking-wider dark:text-text-primary-dark">
                      Total
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-text-primary uppercase tracking-wider dark:text-text-primary-dark">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-surface divide-y divide-border dark:bg-surface-dark dark:divide-border-dark">
                  {recentOrders.map((order) => (
                    <tr 
                      key={order.id} 
                      className="transition-colors duration-150 hover:bg-surface-elevated dark:hover:bg-surface-elevated-dark"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                          {order.poNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary dark:text-text-secondary-dark">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/orders/${order.id}`}
                          className="text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 transition-colors"
                        >
                          View details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

