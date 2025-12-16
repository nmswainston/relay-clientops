import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  isLoading = false,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    'relative inline-flex items-center justify-center',
    'font-semibold rounded-lg',
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'active:scale-[0.98]',
    'dark:focus:ring-offset-[var(--color-bg-base-dark)]'
  );
  
  const variantStyles = {
    primary: cn(
      'bg-accent-600 text-white shadow-sm shadow-accent-600/20',
      'hover:bg-accent-700 hover:shadow-md hover:shadow-accent-700/30',
      'focus:ring-accent-500',
      'dark:bg-accent-600 dark:hover:bg-accent-700'
    ),
    secondary: cn(
      'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-sm',
      'hover:bg-[var(--color-surface-elevated)] hover:shadow-md',
      'focus:ring-secondary-400',
      'dark:bg-[var(--color-surface-elevated-dark)] dark:text-[var(--color-text-primary-dark)] dark:hover:bg-[var(--color-surface-elevated-dark)]'
    ),
    outline: cn(
      'border-2 border-accent-600 text-accent-600 bg-transparent',
      'hover:bg-accent-50 hover:border-accent-700 hover:text-accent-700',
      'focus:ring-accent-500',
      'dark:border-accent-500 dark:text-accent-400 dark:hover:bg-accent-900/20'
    ),
    ghost: cn(
      'text-[var(--color-text-primary)] bg-transparent',
      'hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]',
      'focus:ring-secondary-400',
      'dark:text-[var(--color-text-primary-dark)] dark:hover:bg-[var(--color-surface-elevated-dark)]'
    ),
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
    </button>
  );
}

