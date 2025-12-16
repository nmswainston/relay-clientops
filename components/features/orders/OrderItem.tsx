'use client';

import { OrderItem as OrderItemType } from '@/types/order';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface OrderItemProps {
  item: OrderItemType;
  quantity: number;
  isSelected: boolean;
  onToggle: () => void;
  onQuantityChange: (quantity: number) => void;
}

export default function OrderItem({
  item,
  quantity,
  isSelected,
  onToggle,
  onQuantityChange,
}: OrderItemProps) {
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div
      className={cn(
        'border-2 rounded-xl p-5 transition-all duration-200',
        isSelected
          ? 'border-accent-500 bg-accent-50/50 dark:bg-accent-900/20 shadow-sm'
          : 'border-border dark:border-border-dark dark:bg-surface-dark/50 hover:border-border dark:hover:border-border-dark'
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-start space-x-4 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggle}
            className="mt-1 h-5 w-5 text-accent-600 focus:ring-2 focus:ring-accent-500 focus:ring-offset-1 border-border rounded transition-colors dark:border-border-dark dark:bg-surface-dark cursor-pointer"
            aria-label={`Select ${item.productName}`}
          />
          <div className="flex-1">
            <h4 className="font-semibold text-text-primary dark:text-text-primary-dark text-base">{item.productName}</h4>
            <p className="text-sm text-text-secondary mt-1 dark:text-text-secondary-dark">SKU: {item.sku}</p>
            <p className="text-lg font-semibold text-text-primary mt-2 dark:text-text-primary-dark">
              {formatCurrency(item.price)}
              <span className="text-sm font-normal text-text-secondary dark:text-text-secondary-dark ml-1">each</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end space-x-4 sm:space-x-6">
          <div className="flex items-center border-2 border-border rounded-lg overflow-hidden dark:border-border-dark">
            <button
              onClick={handleDecrement}
              disabled={quantity === 0}
              className="px-3 py-1.5 text-text-primary hover:bg-surface-elevated disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:text-text-primary-dark dark:hover:bg-surface-elevated-dark transition-colors font-medium"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-4 py-1.5 text-text-primary font-semibold min-w-[3rem] text-center bg-surface-elevated dark:bg-surface-elevated-dark dark:text-text-primary-dark">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="px-3 py-1.5 text-text-primary hover:bg-surface-elevated dark:text-text-primary-dark dark:hover:bg-surface-elevated-dark transition-colors font-medium"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-secondary dark:text-text-secondary-dark uppercase tracking-wide">Subtotal</p>
            <p className="text-xl font-bold text-text-primary dark:text-text-primary-dark">
              {formatCurrency(item.price * quantity)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

