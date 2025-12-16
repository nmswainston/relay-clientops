import { Order } from '@/types/order';

// Utility function for conditional class names
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Status badge utilities
export const statusClasses: Record<Order['status'], string> = {
  'ordered': 'status-neutral',
  'processing': 'status-neutral',
  'shipped': 'status-neutral',
  'out-for-delivery': 'status-info',
  'delivered': 'status-success',
};

export const statusLabel: Record<Order['status'], string> = {
  'ordered': 'Ordered',
  'processing': 'Processing',
  'shipped': 'Shipped',
  'out-for-delivery': 'Out for Delivery',
  'delivered': 'Delivered',
};

export function getStatusBadgeClass(status: Order['status']): string {
  return statusClasses[status];
}

export function getStatusLabel(status: Order['status']): string {
  return statusLabel[status];
}

// Date formatting utilities
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'long') {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  return dateObj.toLocaleDateString('en-US');
}

export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

// Price formatting utilities
export function formatPrice(price: number): string {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCurrency(price: number): string {
  return `$${formatPrice(price)}`;
}

