'use client';

import { TrackingStatus, TrackingEvent } from '@/types/tracking';
import { formatDateTime } from '@/lib/utils';

interface TimelineProps {
  events: TrackingEvent[];
  currentStatus: TrackingStatus;
}

const statusOrder: TrackingStatus[] = [
  'ordered',
  'processing',
  'shipped',
  'out-for-delivery',
  'delivered',
];

const statusLabels: Record<TrackingStatus, string> = {
  ordered: 'Ordered',
  processing: 'Processing',
  shipped: 'Shipped',
  'out-for-delivery': 'Out for Delivery',
  delivered: 'Delivered',
};

export default function Timeline({ events, currentStatus }: TimelineProps) {
  const currentStatusIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="relative">
      {statusOrder.map((status, index) => {
        const event = events.find((e) => e.status === status);
        const isCompleted = index <= currentStatusIndex;
        const isCurrent = index === currentStatusIndex;

        return (
          <div key={status} className="relative pb-8">
            {index !== statusOrder.length - 1 && (
              <div
                className={`absolute left-4 top-8 h-full w-0.5 ${
                  isCompleted ? 'bg-accent-600' : 'bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]'
                }`}
              />
            )}
            <div className="flex items-start">
              <div
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                  isCompleted ? 'bg-accent-600' : 'bg-[var(--color-border)] dark:bg-[var(--color-border-dark)]'
                }`}
              >
                {isCompleted && (
                  <svg
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-6 flex-1">
                <h3
                  className={`text-sm font-semibold ${
                    isCurrent
                      ? 'text-accent-600 dark:text-accent-400'
                      : isCompleted
                        ? 'text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]'
                        : 'text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'
                  }`}
                >
                  {statusLabels[status]}
                </h3>
                {event && (
                  <>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
                      {event.description}
                    </p>
                    {event.location && (
                      <p className="mt-1 text-xs text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
                        {event.location}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
                      {formatDateTime(event.timestamp)}
                    </p>
                  </>
                )}
                {!event && !isCompleted && (
                  <p className="mt-1 text-sm text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">Pending</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

