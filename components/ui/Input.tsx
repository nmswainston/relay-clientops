import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random()}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-text-primary mb-2 dark:text-text-primary-dark"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-2.5',
          'border-2 rounded-lg',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-1',
          'bg-surface dark:bg-surface-dark dark:text-text-primary-dark',
          'placeholder:text-text-muted dark:placeholder:text-text-muted-dark',
          error
            ? cn(
                'border-error-500 focus:ring-error-500 focus:border-error-500',
                'dark:border-error-600 dark:focus:border-error-600'
              )
            : cn(
                'border-border dark:border-border-dark',
                'focus:ring-accent-500 focus:border-accent-500',
                'hover:border-border dark:hover:border-border-dark',
                'dark:focus:border-accent-400'
              ),
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-elevated dark:disabled:bg-surface-elevated-dark',
          className
        )}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-sm text-error-600 dark:text-error-400 font-medium flex items-center gap-1"
          role="alert"
        >
          <svg
            className="w-4 h-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-text-secondary dark:text-text-secondary-dark">
          {helperText}
        </p>
      )}
    </div>
  );
}

