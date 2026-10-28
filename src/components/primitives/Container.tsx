import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export function Container({ children, className = '', size = 'default' }: ContainerProps) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  }[size];

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 w-full ${sizeClasses} ${className}`}>
      {children}
    </div>
  );
}
