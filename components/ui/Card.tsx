import React from 'react';
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
    'bg-white rounded-xl shadow-sm border border-gray-200/80',
    'text-gray-900 transition-all duration-200',
    'dark:bg-slate-900 dark:text-gray-100 dark:border-slate-800/80 dark:shadow-slate-950/40',
    paddingClasses[padding],
    (hover || onClick) && 'cursor-pointer hover:shadow-md hover:shadow-gray-200/50 hover:border-gray-300 hover:-translate-y-0.5 dark:hover:shadow-lg dark:hover:shadow-slate-950/60 dark:hover:border-slate-700',
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

