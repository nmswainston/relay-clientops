
interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export default function LoadingSpinner({
  message = 'Loading...',
  size = 'md',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
      <div className="text-center">
        <div className="relative inline-block">
          <div
            className={`inline-block animate-spin rounded-full border-2 border-accent-200 dark:border-accent-900/50 ${sizeClasses[size]}`}
          />
          <div
            className={`absolute top-0 left-0 animate-[spin_0.75s_linear_infinite] rounded-full border-t-2 border-r-2 border-accent-600 dark:border-accent-400 ${sizeClasses[size]}`}
          />
        </div>
        {message && (
          <p className="mt-4 text-sm font-medium text-text-secondary dark:text-text-secondary-dark">{message}</p>
        )}
      </div>
    </div>
  );
}

