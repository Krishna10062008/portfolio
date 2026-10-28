import React, { useRef, useState, useCallback } from 'react';
import { useMotionPrefs } from '../../hooks/useMotionPrefs.ts';

interface MagneticButtonProps {
  children: React.ReactNode;
  maxPull?: number; // max 8px pull per specification
  className?: string;
  as?: 'div' | 'span';
}

export function MagneticButton({
  children,
  maxPull = 8,
  className = '',
  as: Component = 'div',
}: MagneticButtonProps) {
  const { enableMagnetic } = useMotionPrefs();
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ centerX: number; centerY: number; maxRadius: number } | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (!enableMagnetic || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rectRef.current = {
      centerX: rect.left + rect.width / 2,
      centerY: rect.top + rect.height / 2,
      maxRadius: Math.max(rect.width, rect.height) / 2,
    };
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.08s ease-out';
    }
  }, [enableMagnetic]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enableMagnetic || !containerRef.current || !rectRef.current) return;

      const { centerX, centerY, maxRadius } = rectRef.current;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const dist = Math.hypot(dx, dy);
      if (dist === 0 || maxRadius === 0) {
        containerRef.current.style.transform = 'translate3d(0, 0, 0)';
        return;
      }

      const factor = Math.min(dist / maxRadius, 1);
      const pullX = (dx / dist) * factor * maxPull;
      const pullY = (dy / dist) * factor * maxPull;

      containerRef.current.style.transform = `translate3d(${pullX.toFixed(2)}px, ${pullY.toFixed(2)}px, 0)`;
    },
    [enableMagnetic, maxPull]
  );

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      containerRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  }, []);

  if (!enableMagnetic) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      ref={containerRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
      style={{
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      {children}
    </Component>
  );
}
