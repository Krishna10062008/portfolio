import { useEffect, useRef } from 'react';

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const onResize = () => {
      docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollY / docHeight));

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#D4161F] z-[99998] origin-left pointer-events-none shadow-[0_0_8px_rgba(212,22,31,0.8)] will-change-transform"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden="true"
    />
  );
}
