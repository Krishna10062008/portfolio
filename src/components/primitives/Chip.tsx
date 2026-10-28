import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  tone?: 'ink' | 'paper';
  variant?: 'default' | 'crimson' | 'gold';
  size?: 'sm' | 'md';
  className?: string;
  'data-cursor'?: string;
}

export function Chip({
  children,
  tone = 'ink',
  variant = 'default',
  size = 'sm',
  className = '',
  'data-cursor': dataCursor,
}: ChipProps) {
  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3.5 py-1.5';

  const toneVariantClasses = {
    ink: {
      default: 'bg-[#18181B] text-[#F1E6D0] border border-[#27272A]',
      crimson: 'bg-[#5A0B0F]/40 text-[#F87171] border border-[#D4161F]/60',
      gold: 'bg-[#C9922B]/10 text-[#C9922B] border border-[#C9922B]/50',
    },
    paper: {
      default: 'bg-[#E5D7BF] text-[#0B0B0C] border border-[#0B0B0C]/20',
      crimson: 'bg-[#FEE2E2] text-[#5A0B0F] border border-[#D4161F]/40',
      gold: 'bg-[#FEF3C7] text-[#0B0B0C] border border-[#0B0B0C]/30',
    },
  }[tone][variant];

  return (
    <span
      data-cursor={dataCursor}
      className={`inline-flex items-center font-mono font-medium rounded-[2px] transition-colors ${sizeClasses} ${toneVariantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
