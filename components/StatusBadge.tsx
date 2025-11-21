import React from 'react';
import { Order } from '@/types/order';
import { getStatusBadgeClass, getStatusLabel } from '@/lib/utils';

interface StatusBadgeProps {
  status: Order['status'];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
};

export default function StatusBadge({
  status,
  size = 'md',
  className = '',
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${getStatusBadgeClass(
        status
      )} ${sizeClasses[size]} ${className}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}

