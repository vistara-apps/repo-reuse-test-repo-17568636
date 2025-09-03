'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

export function Card({
  children,
  title,
  description,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
}: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden ${className}`}>
      {(title || description) && (
        <div className={`px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 ${headerClassName}`}>
          {title && <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">{title}</h3>}
          {description && <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
      )}
      
      <div className={`px-4 py-5 sm:p-6 ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
}

