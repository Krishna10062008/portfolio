import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'paper' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  'data-cursor'?: string;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  target,
  rel,
  'data-cursor': dataCursor = 'link',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-150 rounded-[2px] border-2 select-none active:translate-x-0.5 active:translate-y-0.5';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 font-mono',
    md: 'text-sm px-5 py-2.5 font-mono',
    lg: 'text-base px-7 py-3 font-mono tracking-wider',
  }[size];

  const variantStyles = {
    // Primary Crimson
    primary:
      'bg-[#D4161F] text-white border-[#0B0B0C] shadow-[4px_4px_0px_#0B0B0C] hover:bg-[#b01018] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#0B0B0C]',
    // Ghost Gold Outline
    ghost:
      'bg-transparent text-[#C9922B] border-[#C9922B] shadow-[4px_4px_0px_#0B0B0C] hover:bg-[#C9922B] hover:text-[#0B0B0C] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#C9922B]',
    // Paper
    paper:
      'bg-[#F1E6D0] text-[#0B0B0C] border-[#0B0B0C] shadow-[4px_4px_0px_#0B0B0C] hover:bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#0B0B0C]',
    // Gold Solid
    gold:
      'bg-[#C9922B] text-[#0B0B0C] border-[#0B0B0C] shadow-[4px_4px_0px_#0B0B0C] hover:bg-[#d8a135] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#0B0B0C]',
  }[variant];

  const combinedClass = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (as === 'a') {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        data-cursor={dataCursor}
        className={combinedClass}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      data-cursor={dataCursor}
      className={combinedClass}
      {...rest}
    >
      {children}
    </button>
  );
}
