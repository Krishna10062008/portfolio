import React from 'react';

interface SkipLinkProps {
  targetId?: string;
  label?: string;
}

export function SkipLink({ targetId = '#main-content', label = 'Skip to main content' }: SkipLinkProps) {
  return (
    <a
      href={targetId}
      className="fixed top-2 left-2 z-[10000] -translate-y-24 focus:translate-y-0 transition-transform bg-[#D4161F] text-white px-4 py-2 font-mono text-sm font-bold border-2 border-[#0B0B0C] shadow-[4px_4px_0px_#C9922B] rounded-[2px]"
      data-cursor="link"
    >
      {label}
    </a>
  );
}
