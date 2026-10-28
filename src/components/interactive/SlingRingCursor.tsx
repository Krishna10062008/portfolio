import React, { useEffect, useRef } from 'react';
import { useMotionPrefs } from '../../hooks/useMotionPrefs.ts';

export function SlingRingCursor() {
  const { enableCursor } = useMotionPrefs();

  // Coordinates references for 120fps smoothness without re-render loop
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rotationRef = useRef(0);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const burstContainerRef = useRef<HTMLDivElement>(null);

  // Cached state to avoid redundant DOM operations
  const currentToneRef = useRef<string>('ink');
  const currentCursorRef = useRef<string>('none');
  const isHiddenRef = useRef<boolean>(false);
  const isMoving = useRef(false);
  const stopMoveTimer = useRef<number | null>(null);
  const pulseTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!enableCursor) return;

    // Enable custom cursor styles on documentElement
    document.documentElement.classList.add('sling-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      isMoving.current = true;

      // Instant dot positioning
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }

      if (containerRef.current) {
        // Fast element check
        const target = e.target as HTMLElement | null;
        if (target) {
          const toneEl = target.closest('[data-tone]');
          const currentTone = toneEl?.getAttribute('data-tone') === 'paper' ? 'paper' : 'ink';
          if (currentTone !== currentToneRef.current) {
            currentToneRef.current = currentTone;
            containerRef.current.setAttribute('data-tone', currentTone);
          }

          const cursorEl = target.closest('[data-cursor]');
          const state = cursorEl?.getAttribute('data-cursor') || 'none';
          if (state !== currentCursorRef.current) {
            currentCursorRef.current = state;
            containerRef.current.setAttribute('data-cursor-state', state);
          }

          const isInput =
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.isContentEditable ||
            window.getSelection()?.toString().length! > 0;

          if (isInput !== isHiddenRef.current) {
            isHiddenRef.current = Boolean(isInput);
            containerRef.current.style.opacity = isInput ? '0' : '1';
          }
        }
      }

      // Reset idle timer
      if (stopMoveTimer.current) clearTimeout(stopMoveTimer.current);
      stopMoveTimer.current = window.setTimeout(() => {
        isMoving.current = false;
      }, 150);
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Pulse ring via CSS data attribute
      if (containerRef.current) {
        containerRef.current.setAttribute('data-pulsing', 'true');
        if (pulseTimer.current) clearTimeout(pulseTimer.current);
        pulseTimer.current = window.setTimeout(() => {
          containerRef.current?.removeAttribute('data-pulsing');
        }, 220);
      }

      // Spawn radiating web strands in pure DOM (zero React re-render overhead)
      if (burstContainerRef.current) {
        const burstEl = document.createElement('div');
        burstEl.className = 'fixed pointer-events-none z-[99999]';
        burstEl.style.left = `${e.clientX - 60}px`;
        burstEl.style.top = `${e.clientY - 60}px`;
        burstEl.style.width = '120px';
        burstEl.style.height = '120px';
        burstEl.innerHTML = `
          <svg viewBox="0 0 120 120" class="w-full h-full animate-[fadeWebStrands_400ms_ease-out_forwards]">
            <g stroke="#D4161F" stroke-linecap="round">
              ${[0, 60, 120, 180, 240, 300].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                const nextRad = ((angle + 60) * Math.PI) / 180;
                const x1 = 60 + Math.cos(rad) * 8;
                const y1 = 60 + Math.sin(rad) * 8;
                const x2 = 60 + Math.cos(rad) * 48;
                const y2 = 60 + Math.sin(rad) * 48;
                const cx1 = 60 + Math.cos(rad) * 30;
                const cy1 = 60 + Math.sin(rad) * 30;
                const cx2 = 60 + Math.cos(nextRad) * 30;
                const cy2 = 60 + Math.sin(nextRad) * 30;
                return `
                  <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="1.5" />
                  <line x1="${cx1}" y1="${cy1}" x2="${cx2}" y2="${cy2}" stroke-width="0.8" opacity="0.75" />
                `;
              }).join('')}
            </g>
          </svg>
        `;
        burstContainerRef.current.appendChild(burstEl);
        window.setTimeout(() => {
          if (burstEl.parentNode) burstEl.parentNode.removeChild(burstEl);
        }, 420);
      }
    };

    const handleMouseLeave = () => {
      if (containerRef.current) containerRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (containerRef.current) containerRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // RAF loop for Lerp 0.18 and continuous slow rotation
    let rafId: number;
    const animateRing = () => {
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;

      // Only compute and update when moving or catching up
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || isMoving.current) {
        ringPos.current.x += dx * 0.18;
        ringPos.current.y += dy * 0.18;
        rotationRef.current = (rotationRef.current + 0.4) % 360;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
          const ringSvg = ringRef.current.firstElementChild as HTMLElement;
          if (ringSvg) {
            ringSvg.style.transform = `rotate(${rotationRef.current}deg)`;
          }
        }
      }

      rafId = requestAnimationFrame(animateRing);
    };

    rafId = requestAnimationFrame(animateRing);

    return () => {
      document.documentElement.classList.remove('sling-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
      if (pulseTimer.current) clearTimeout(pulseTimer.current);
      if (stopMoveTimer.current) clearTimeout(stopMoveTimer.current);
    };
  }, [enableCursor]);

  if (!enableCursor) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      data-tone="ink"
      data-cursor-state="none"
      className="sling-ring-container pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none transition-opacity duration-150"
      aria-hidden="true"
    >
      {/* 1. Element: 8px crimson dot that follows instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#D4161F] shadow-[0_0_6px_rgba(212,22,31,0.8)] pointer-events-none will-change-transform"
      />

      {/* 2. Element: 36px gold/ink dashed mandala ring that follows with lerp 0.18 and slowly rotates */}
      <div
        ref={ringRef}
        className="sling-ring-target fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div className="sling-ring-body relative flex items-center justify-center transition-all duration-200 ease-out">
          {/* Dashed Mandala Ring Background SVG */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              {/* Outer dashed mystic ring */}
              <circle
                cx="50"
                cy="50"
                r="46"
                className="sling-outer-circle"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              {/* Inner concentric hairline */}
              <circle
                cx="50"
                cy="50"
                r="38"
                className="sling-inner-circle"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 3"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Badges and Fill states */}
          <div className="sling-badge-play hidden w-full h-full rounded-full bg-[#D4161F] text-white items-center justify-center shadow-[0_0_16px_rgba(212,22,31,0.9)] border-2 border-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>

          <div className="sling-badge-hire hidden w-full h-full rounded-full bg-[#C9922B] text-[#0B0B0C] items-center justify-center font-mono font-black text-[11px] tracking-wider border-2 border-[#0B0B0C] shadow-[0_0_15px_rgba(201,146,43,0.85)] uppercase">
            HIRE
          </div>

          <div className="sling-badge-view hidden w-full h-full rounded-full items-center justify-center font-mono font-bold text-[10px] tracking-wider uppercase border border-current shadow-sm bg-black/15">
            VIEW
          </div>

          <div className="sling-badge-link hidden w-full h-full rounded-full bg-[#D4161F]/15 border border-[#D4161F]/50 animate-pulse" />

          <div className="sling-badge-drag hidden font-mono text-xs font-black tracking-widest">
            ◀ ▶
          </div>
        </div>
      </div>

      {/* Radiating web strands container on click */}
      <div ref={burstContainerRef} className="fixed inset-0 pointer-events-none overflow-hidden" />
    </div>
  );
}
