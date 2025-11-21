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
    'bg-white rounded-lg shadow-md p-6 text-gray-900 dark:bg-slate-900 dark:text-gray-100 dark:shadow-slate-950/40';
  const hoverStyles =
    hover || onClick
      ? 'cursor-pointer transition-shadow hover:shadow-lg dark:hover:shadow-slate-900/60'
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

