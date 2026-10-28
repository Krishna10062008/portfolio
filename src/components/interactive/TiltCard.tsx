import React, { useRef, useState, useCallback } from 'react';
import { useMotionPrefs } from '../../hooks/useMotionPrefs.ts';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; // default 6 degrees per specification
  glare?: boolean;
  className?: string;
  tone?: 'ink' | 'paper';
}

export function TiltCard({
  children,
  maxTilt = 6,
  glare = true,
  className = '',
  tone = 'ink',
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: TiltCardProps) {
  const { enableTilt } = useMotionPrefs();
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e);
      if (!enableTilt || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      rectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.08s ease-out';
      }
      if (glare && glareRef.current) {
        glareRef.current.style.opacity = '0.14';
      }
    },
    [enableTilt, glare, onMouseEnter]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(e);
      if (!enableTilt || !cardRef.current || !rectRef.current) return;

      const { left, top, width, height } = rectRef.current;
      const x = e.clientX - left;
      const y = e.clientY - top;

      const px = (x / width - 0.5) * 2;
      const py = (y / height - 0.5) * 2;

      const rx = -py * maxTilt;
      const ry = px * maxTilt;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;

      if (glare && glareRef.current) {
        const gx = (x / width) * 100;
        const gy = (y / height) * 100;
        glareRef.current.style.backgroundImage =
          tone === 'paper'
            ? `radial-gradient(circle at ${gx}% ${gy}%, rgba(212,22,31,0.18) 0%, transparent 65%)`
            : `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22) 0%, transparent 65%)`;
      }
    },
    [enableTilt, maxTilt, glare, tone, onMouseMove]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      rectRef.current = null;
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
      if (glare && glareRef.current) {
        glareRef.current.style.opacity = '0';
      }
    },
    [glare, onMouseLeave]
  );

  if (!enableTilt) {
    return (
      <div ref={cardRef} className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      }}
      {...rest}
    >
      {children}

      {/* Soft interactive glare overlay driven via ref */}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-[inherit]"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
