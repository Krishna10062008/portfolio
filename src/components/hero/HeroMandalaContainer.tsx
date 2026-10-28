import React, { useState, useEffect, lazy, Suspense } from 'react';
import { MandalaRing } from '../decorations/MandalaRing.tsx';

// Lazy load the Three.js chunk after first paint
const LazyThreeMandala = lazy(() => import('./ThreeMandala.tsx'));

interface HeroMandalaContainerProps {
  onShiftChange?: (shiftX: number, shiftY: number) => void;
  className?: string;
}

export function HeroMandalaContainer({
  onShiftChange,
  className = '',
}: HeroMandalaContainerProps) {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const [is3DReady, setIs3DReady] = useState(false);
  const [useSvgFallback, setUseSvgFallback] = useState(false);

  useEffect(() => {
    // 1. Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setUseSvgFallback(true);
      return;
    }

    // 2. Check touch device or coarse pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      setUseSvgFallback(true);
      return;
    }

    // 3. Check for low-power concurrency
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      setUseSvgFallback(true);
      return;
    }

    // 4. Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setUseSvgFallback(true);
        return;
      }
    } catch {
      setUseSvgFallback(true);
      return;
    }

    // 5. Schedule 3D load after first paint via requestIdleCallback
    const scheduleLoad = () => {
      setShouldLoad3D(true);
    };

    if ('requestIdleCallback' in window) {
      const idleId = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        scheduleLoad,
        { timeout: 1200 }
      );
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
      };
    } else {
      const timer = setTimeout(scheduleLoad, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 1. Instant Poster: SVG Mandala Ring with CSS rotation */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          is3DReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <MandalaRing
          size={560}
          color="#C9922B"
          glow={true}
          className="scale-75 sm:scale-95 lg:scale-105 opacity-85"
        />
      </div>

      {/* 2. Three.js Live 3D Mandala (Lazy Loaded, Crossfaded) */}
      {shouldLoad3D && !useSvgFallback && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
            is3DReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Suspense fallback={null}>
            <LazyThreeMandala
              onLoaded={() => setIs3DReady(true)}
              onTiltChange={(_tiltX, _tiltY, shiftX, shiftY) => {
                onShiftChange?.(shiftX, shiftY);
              }}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
