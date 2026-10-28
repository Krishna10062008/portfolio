import { useEffect, useState } from 'react';

export interface MotionPrefs {
  prefersReducedMotion: boolean;
  isCoarsePointer: boolean;
  shouldReduceMotion: boolean;
  enableCursor: boolean;
  enableSmoothScroll: boolean;
  enableTilt: boolean;
  enableMagnetic: boolean;
  enablePersistentMandala: boolean;
}

export function useMotionPrefs(): MotionPrefs {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: coarse)');

    setPrefersReducedMotion(motionQuery.matches);
    setIsCoarsePointer(pointerQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    const onPointerChange = (e: MediaQueryListEvent) => {
      setIsCoarsePointer(e.matches);
    };

    motionQuery.addEventListener('change', onMotionChange);
    pointerQuery.addEventListener('change', onPointerChange);

    return () => {
      motionQuery.removeEventListener('change', onMotionChange);
      pointerQuery.removeEventListener('change', onPointerChange);
    };
  }, []);

  return {
    prefersReducedMotion,
    isCoarsePointer,
    shouldReduceMotion: prefersReducedMotion,
    enableCursor: !prefersReducedMotion && !isCoarsePointer,
    enableSmoothScroll: !prefersReducedMotion && !isCoarsePointer,
    enableTilt: !prefersReducedMotion && !isCoarsePointer,
    enableMagnetic: !prefersReducedMotion && !isCoarsePointer,
    enablePersistentMandala: !prefersReducedMotion,
  };
}
