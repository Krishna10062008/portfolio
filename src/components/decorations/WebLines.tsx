import React from 'react';

interface WebLinesProps {
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}

export function WebLines({
  corner = 'top-left',
  className = '',
  size = 180,
  color = '#D4161F',
  opacity = 0.85,
}: WebLinesProps) {
  const rotation = {
    'top-left': 'rotate(0deg)',
    'top-right': 'scaleX(-1)',
    'bottom-left': 'scaleY(-1)',
    'bottom-right': 'scale(-1, -1)',
  }[corner];

  return (
    <div
      className={`pointer-events-none select-none absolute z-0 overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        transform: rotation,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ opacity }}
      >
        {/* Radial structural spokes */}
        <line x1="0" y1="0" x2="200" y2="0" stroke={color} strokeWidth="2" />
        <line x1="0" y1="0" x2="190" y2="60" stroke={color} strokeWidth="1.5" />
        <line x1="0" y1="0" x2="170" y2="110" stroke={color} strokeWidth="1.5" />
        <line x1="0" y1="0" x2="140" y2="155" stroke={color} strokeWidth="1.5" />
        <line x1="0" y1="0" x2="100" y2="185" stroke={color} strokeWidth="1.5" />
        <line x1="0" y1="0" x2="50" y2="195" stroke={color} strokeWidth="1.5" />
        <line x1="0" y1="0" x2="0" y2="200" stroke={color} strokeWidth="2" />

        {/* Concentric curved web arcs */}
        {/* Arc Tier 1 */}
        <path
          d="M 40,0 Q 36,12 38,12 Q 33,22 34,22 Q 27,31 28,31 Q 20,38 20,38 Q 10,40 0,40"
          stroke={color}
          strokeWidth="1.25"
          fill="none"
        />
        {/* Arc Tier 2 */}
        <path
          d="M 80,0 Q 74,24 76,24 Q 67,44 68,44 Q 55,62 56,62 Q 40,76 40,76 Q 20,80 0,80"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        {/* Arc Tier 3 */}
        <path
          d="M 125,0 Q 116,38 119,38 Q 105,69 107,69 Q 86,97 88,97 Q 63,119 63,119 Q 32,125 0,125"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        {/* Arc Tier 4 */}
        <path
          d="M 175,0 Q 163,53 167,53 Q 147,97 150,97 Q 121,136 123,136 Q 88,167 88,167 Q 44,175 0,175"
          stroke={color}
          strokeWidth="1.75"
          fill="none"
        />
      </svg>
    </div>
  );
}
