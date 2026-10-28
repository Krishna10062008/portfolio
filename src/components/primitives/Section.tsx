import React from 'react';
import { MaskedReveal } from '../interactive/MaskedReveal.tsx';

export type Tone = 'ink' | 'paper';

interface SectionProps {
  id?: string;
  tone: Tone;
  chapter?: string;
  title?: string;
  subtitle?: string;
  diagonalTop?: boolean;
  diagonalReverse?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  tone,
  chapter,
  title,
  subtitle,
  diagonalTop = false,
  diagonalReverse = false,
  className = '',
  children,
}: SectionProps) {
  const toneClasses = {
    ink: 'bg-[#0B0B0C] text-[#F1E6D0]',
    paper: 'bg-[#F1E6D0] text-[#0B0B0C]',
  }[tone];

  const diagonalClass = diagonalTop
    ? diagonalReverse
      ? 'diagonal-cut-top-reverse'
      : 'diagonal-cut-top'
    : '';

  return (
    <section
      id={id}
      data-tone={tone}
      className={`relative z-10 py-16 sm:py-24 transition-colors ${toneClasses} ${diagonalClass} ${className}`}
    >
      {(chapter || title) && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
          <div className="flex flex-col items-start gap-2">
            {chapter && (
              <div className="inline-flex items-center gap-2">
                <span
                  className={`font-mono text-xs uppercase tracking-widest font-bold px-2 py-0.5 rounded-[2px] border ${
                    tone === 'ink'
                      ? 'bg-[#18181B] text-[#C9922B] border-[#C9922B]/40'
                      : 'bg-[#E5D7BF] text-[#5A0B0F] border-[#5A0B0F]/30'
                  }`}
                >
                  {chapter}
                </span>
                <span
                  className={`h-[1px] w-8 sm:w-16 ${
                    tone === 'ink' ? 'bg-[#C9922B]/30' : 'bg-[#0B0B0C]/20'
                  }`}
                />
              </div>
            )}
            {title && (
              <MaskedReveal delay={0.05} className="w-full">
                <h2
                  className={`font-display text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase ${
                    tone === 'ink' ? 'text-[#F1E6D0]' : 'text-[#0B0B0C]'
                  }`}
                  style={{ textWrap: 'balance' }}
                >
                  {title}
                </h2>
              </MaskedReveal>
            )}
            {subtitle && (
              <p
                className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
                  tone === 'ink' ? 'text-[#F1E6D0]/80' : 'text-[#0B0B0C]/80'
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
      {children}
    </section>
  );
}
