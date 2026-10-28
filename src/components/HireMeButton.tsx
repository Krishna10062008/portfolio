import React from 'react';
import { MagneticButton } from './interactive/MagneticButton.tsx';

export function WhatsAppGlyph({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.486-8.414z" />
    </svg>
  );
}

interface HireMeButtonProps {
  variant?: 'primary' | 'compact' | 'floating';
  className?: string;
}

export function HireMeButton({ variant = 'primary', className = '' }: HireMeButtonProps) {
  if (variant === 'compact') {
    return (
      <MagneticButton maxPull={6} className="shrink-0">
        <a
          href="/hire"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hire"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D4161F] text-white text-xs font-mono font-bold tracking-wider uppercase rounded-[2px] border-2 border-[#0B0B0C] shadow-[3px_3px_0px_#C9922B] hover:bg-[#b01018] transition-all select-none whitespace-nowrap shrink-0 ${className}`}
        >
          <WhatsAppGlyph className="w-3.5 h-3.5 shrink-0" />
          <span>HIRE ME</span>
          <span className="font-mono text-[11px] opacity-90 font-normal">@krishna</span>
        </a>
      </MagneticButton>
    );
  }

  if (variant === 'floating') {
    return (
      <a
        href="/hire"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hire"
        aria-label="Hire Krishna via WhatsApp @krishna"
        className={`fixed bottom-6 right-6 z-50 md:hidden flex items-center gap-2 px-4 py-3 bg-[#D4161F] text-white font-mono text-sm font-bold tracking-wider uppercase rounded-[2px] border-2 border-[#0B0B0C] shadow-[4px_4px_0px_#0B0B0C] active:translate-x-0.5 active:translate-y-0.5 animate-in fade-in slide-in-from-bottom-6 duration-300 ${className}`}
      >
        <WhatsAppGlyph className="w-4 h-4 shrink-0" />
        <span>HIRE ME</span>
        <span className="text-xs font-mono font-normal">@krishna</span>
      </a>
    );
  }

  return (
    <MagneticButton maxPull={8}>
      <a
        href="/hire"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hire"
        className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#D4161F] text-white text-sm sm:text-base font-mono font-bold tracking-wider uppercase rounded-[2px] border-2 border-[#0B0B0C] shadow-[5px_5px_0px_#0B0B0C] hover:bg-[#b01018] active:translate-x-0.5 active:translate-y-0.5 transition-all select-none ${className}`}
      >
        <WhatsAppGlyph className="w-5 h-5 shrink-0" />
        <span>HIRE ME</span>
        <span className="font-mono text-xs sm:text-sm font-normal text-white/90">@krishna</span>
      </a>
    </MagneticButton>
  );
}
