import React from 'react';

interface MandalaRingProps {
  className?: string;
  size?: number;
  color?: string;
  glow?: boolean;
  interactive?: boolean;
  rotationSpeed?: number; // seconds per turn
}

export function MandalaRing({
  className = '',
  size = 500,
  color = '#C9922B',
  glow = true,
}: MandalaRingProps) {
  // Generate 36 radial rune tick marks for the outer ring
  const ticks = Array.from({ length: 36 }).map((_, i) => {
    const angle = (i * 360) / 36;
    const isMajor = i % 3 === 0;
    return {
      angle,
      length: isMajor ? 12 : 6,
      strokeWidth: isMajor ? 2.5 : 1.2,
    };
  });

  // Generate 12 zodiac / rune dots
  const runeDots = Array.from({ length: 12 }).map((_, i) => (i * 360) / 12);

  return (
    <div
      className={`select-none pointer-events-none relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer subtle mystic ambient glow */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-25 animate-pulse"
          style={{ backgroundColor: color }}
        />
      )}

      {/* SVG Vector Mandala */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-700"
      >
        <defs>
          <radialGradient id="mandalaCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="70%" stopColor={color} stopOpacity="0.05" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="250" cy="250" r="230" fill="url(#mandalaCenterGlow)" />

        {/* Group with continuous slow mystical rotation */}
        <g className="origin-center animate-[spin_60s_linear_infinite] motion-reduce:animate-none">
          {/* Ring 1 - Outer heavy border */}
          <circle cx="250" cy="250" r="236" stroke={color} strokeWidth="3" />
          <circle cx="250" cy="250" r="226" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Outer radial ticks */}
          {ticks.map((tick, i) => (
            <line
              key={i}
              x1="250"
              y1={250 - 236}
              x2="250"
              y2={250 - 236 + tick.length}
              stroke={color}
              strokeWidth={tick.strokeWidth}
              transform={`rotate(${tick.angle} 250 250)`}
            />
          ))}

          {/* Ring 2 - Concentric band with rune dots */}
          <circle cx="250" cy="250" r="195" stroke={color} strokeWidth="2" />
          <circle cx="250" cy="250" r="185" stroke={color} strokeWidth="1" />
          {runeDots.map((angle, i) => (
            <g key={`rune-${i}`} transform={`rotate(${angle} 250 250)`}>
              <circle cx="250" cy="60" r="4" fill={color} />
              <circle cx="250" cy="60" r="7" stroke={color} strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* Group with counter-rotation for layered mystical depth */}
        <g className="origin-center animate-[spin_45s_linear_infinite_reverse] motion-reduce:animate-none">
          {/* Ring 3 - Intersecting Sacred Geometry (Two rotated squares forming 8-pointed star) */}
          <rect
            x="140"
            y="140"
            width="220"
            height="220"
            stroke={color}
            strokeWidth="1.5"
            transform="rotate(0 250 250)"
          />
          <rect
            x="140"
            y="140"
            width="220"
            height="220"
            stroke={color}
            strokeWidth="1.5"
            transform="rotate(45 250 250)"
          />

          {/* Ring 4 - Inner ring & nested 12-pointed geometry */}
          <circle cx="250" cy="250" r="130" stroke={color} strokeWidth="2" strokeDasharray="8 6" />
          <circle cx="250" cy="250" r="95" stroke={color} strokeWidth="1.5" />

          {/* Inner triangle triad */}
          <polygon
            points="250,155 332,298 168,298"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
          />
          <polygon
            points="250,345 332,202 168,202"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
          />

          {/* Center core sigil */}
          <circle cx="250" cy="250" r="45" stroke={color} strokeWidth="2" />
          <circle cx="250" cy="250" r="20" stroke={color} strokeWidth="2.5" />
          <circle cx="250" cy="250" r="6" fill={color} />
        </g>
      </svg>
    </div>
  );
}
