import React, { useRef, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { useMotionPrefs } from '../../hooks/useMotionPrefs.ts';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

interface ThanosSnapParticleEffectProps {
  onSnapComplete?: () => void;
  className?: string;
}

export function ThanosSnapParticleEffect({ className = '' }: ThanosSnapParticleEffectProps) {
  const { shouldReduceMotion } = useMotionPrefs();
  const [isSnapping, setIsSnapping] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  const triggerSnap = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isSnapping || shouldReduceMotion) return;

      setIsSnapping(true);
      const canvas = canvasRef.current;
      if (!canvas) {
        setTimeout(() => setIsSnapping(false), 1500);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Generate 120 cosmic ash & gold particles
      const particles: Particle[] = [];
      const colors = ['#C9922B', '#E5B25D', '#D4161F', '#F1E6D0', '#71717A', '#3F3F46'];

      for (let i = 0; i < 120; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.4) * 8, // slight drift rightwards like Thanos dust
          vy: (Math.random() - 0.6) * 7,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
        });
      }

      const startTime = performance.now();
      const totalDuration = 1500; // 1.5 seconds per specification

      const render = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / totalDuration);

        ctx.clearRect(0, 0, rect.width, rect.height);

        // First half (0.0 to 0.5): disperse outwards
        // Second half (0.5 to 1.0): reassemble back into card
        particles.forEach((p) => {
          if (progress < 0.5) {
            // Dispersing
            const t = progress / 0.5;
            p.x = p.originX + p.vx * t * 25;
            p.y = p.originY + p.vy * t * 25;
            p.alpha = 1 - t * 0.4;
          } else {
            // Reassembling with smooth ease back
            const t = (progress - 0.5) / 0.5;
            const ease = t * t * (3 - 2 * t); // smoothstep
            p.x = p.originX + p.vx * (1 - ease) * 25;
            p.y = p.originY + p.vy * (1 - ease) * 25;
            p.alpha = 0.6 + ease * 0.4;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(render);
        } else {
          ctx.clearRect(0, 0, rect.width, rect.height);
          setIsSnapping(false);
        }
      };

      rafRef.current = requestAnimationFrame(render);
    },
    [isSnapping, shouldReduceMotion]
  );

  return (
    <div className={`relative ${className}`}>
      {/* Snap Trigger Button */}
      <button
        type="button"
        onClick={triggerSnap}
        disabled={isSnapping}
        data-cursor="link"
        aria-label="Snap: Disperse card into cosmic dust and reassemble"
        title="Snap: Disperse into cosmic dust particles and reassemble in 1.5s"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#18181B] hover:bg-[#D4161F] text-[#F1E6D0] hover:text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-[2px] border border-[#C9922B]/60 shadow-[2px_2px_0px_#0B0B0C] transition-colors select-none cursor-pointer"
      >
        <Sparkles className="w-3 h-3 text-[#C9922B]" />
        <span>{isSnapping ? 'REASSEMBLING...' : 'SNAP DUST'}</span>
      </button>

      {/* Particle Canvas Overlay */}
      {isSnapping && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-50 w-full h-full"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
