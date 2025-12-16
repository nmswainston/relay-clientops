import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'bg-surface rounded-xl shadow-sm border border-border-subtle p-12 text-center',
        'dark:bg-surface-dark dark:border-border-subtle-dark',
        className
      )}
    >
      {icon && <div className="mb-6 flex justify-center">{icon}</div>}
      {!icon && (
        <svg
          className="w-16 h-16 mx-auto text-text-muted dark:text-text-muted-dark mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      )}
      <h3 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-2">
        {title}
      </h3>
      <p className="text-text-secondary dark:text-text-secondary-dark mb-6 max-w-md mx-auto">{description}</p>
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}

