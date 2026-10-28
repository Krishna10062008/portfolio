import { useEffect, useRef } from 'react';
import { useMotionPrefs } from '../../hooks/useMotionPrefs.ts';

export function PersistentMandala() {
  const { enablePersistentMandala } = useMotionPrefs();
  const ringRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enablePersistentMandala) return;

    let rotation = 0;
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let rafId: number;

    const onFrame = (now: number) => {
      const dt = Math.max(1, now - lastTime);
      lastTime = now;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Base idle rotation + rotation proportional to scroll velocity
      const velocity = scrollDelta / dt;
      rotation += 0.04 + velocity * 1.8;

      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${rotation}deg)`;
      }

      rafId = requestAnimationFrame(onFrame);
    };

    rafId = requestAnimationFrame(onFrame);

    // Zero-reflow IntersectionObserver for section tone tracking
    const sections = document.querySelectorAll('[data-tone]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentTone = entry.target.getAttribute('data-tone');
            if (containerRef.current) {
              containerRef.current.style.color = currentTone === 'paper' ? '#D4161F' : '#C9922B';
            }
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach((s) => observer.observe(s));

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [enablePersistentMandala]);

  if (!enablePersistentMandala) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed right-[-15vw] sm:right-[-10vw] top-1/2 -translate-y-1/2 pointer-events-none z-0 transition-colors duration-500 overflow-hidden select-none"
      style={{
        opacity: 0.08, // 8% opacity (per 6-10% requirement)
        color: '#C9922B',
      }}
      aria-hidden="true"
    >
      <div
        ref={ringRef}
        className="w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] lg:w-[800px] lg:h-[800px] will-change-transform"
      >
        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer circle */}
          <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx="250" cy="250" r="230" stroke="currentColor" strokeWidth="1" />
          <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="2" strokeDasharray="12 6" />

          {/* Radial rune lines */}
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="250"
              y1="10"
              x2="250"
              y2="30"
              stroke="currentColor"
              strokeWidth="2"
              transform={`rotate(${i * 15} 250 250)`}
            />
          ))}

          {/* Sacred geometry squares & triangles */}
          <rect
            x="130"
            y="130"
            width="240"
            height="240"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="130"
            y="130"
            width="240"
            height="240"
            stroke="currentColor"
            strokeWidth="1.5"
            transform="rotate(45 250 250)"
          />

          <circle cx="250" cy="250" r="140" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <polygon
            points="250,135 345,300 155,300"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <polygon
            points="250,365 345,200 155,200"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />

          <circle cx="250" cy="250" r="70" stroke="currentColor" strokeWidth="2" />
          <circle cx="250" cy="250" r="30" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="8" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
