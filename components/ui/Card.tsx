import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export default function Card({
  children,
  className = '',
  onClick,
  hover = false,
}: CardProps) {
  const baseStyles =
    'bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-gray-900 dark:bg-slate-900 dark:text-gray-100 dark:shadow-slate-950/40 dark:border-slate-800';
  const hoverStyles =
    hover || onClick
      ? 'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-300 dark:hover:shadow-slate-900/60 dark:hover:border-slate-700'
      : '';
  
  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

