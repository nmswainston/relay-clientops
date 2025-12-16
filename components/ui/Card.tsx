import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  className = '',
  onClick,
  hover = false,
  padding = 'md',
}: CardProps) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseStyles = cn(
    'bg-[var(--color-surface)] rounded-xl shadow-sm border border-[var(--color-border-subtle)]',
    'text-[var(--color-text-primary)] transition-all duration-200',
    'dark:bg-[var(--color-surface-dark)] dark:text-[var(--color-text-primary-dark)] dark:border-[var(--color-border-subtle-dark)]',
    paddingClasses[padding],
    (hover || onClick) && 'cursor-pointer hover:shadow-md hover:shadow-black/5 hover:border-[var(--color-border)] hover:-translate-y-0.5 dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-[var(--color-border-dark)]',
    className
  );
  
  return (
    <div
      className={baseStyles}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
}

