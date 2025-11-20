'use client';

import { OrderItem as OrderItemType } from '@/types/order';

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
    <div className={`border rounded-lg p-4 ${isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}>
      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-start space-x-4 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggle}
            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{item.productName}</h4>
            <p className="text-sm text-gray-500 mt-1">SKU: {item.sku}</p>
            <p className="text-lg font-medium text-gray-900 mt-2">
              ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={handleDecrement}
              disabled={quantity === 0}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              −
            </button>
            <span className="px-4 py-1 text-gray-900 font-medium min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="text-lg font-semibold text-gray-900">
              ${(item.price * quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

