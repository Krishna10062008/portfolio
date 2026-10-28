import React from 'react';

interface SpeedBurstProps {
  className?: string;
  color?: string;
  opacity?: number;
  origin?: 'right' | 'left' | 'center';
}

export function SpeedBurst({
  className = '',
  color = '#D4161F',
  opacity = 0.85,
  origin = 'right',
}: SpeedBurstProps) {
  const originTransform = {
    right: 'scaleX(1)',
    left: 'scaleX(-1)',
    center: 'scale(1)',
  }[origin];

  return (
    <div
      className={`pointer-events-none select-none absolute z-0 overflow-hidden ${className}`}
      style={{ transform: originTransform }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ opacity }}
      >
        {/* Comic Speed Line Bursts */}
        <polygon points="400,150 180,146 180,154" fill={color} />
        <polygon points="400,150 210,115 205,122" fill={color} />
        <polygon points="400,150 250,80 242,86" fill={color} />
        <polygon points="400,150 280,40 270,44" fill={color} />
        <polygon points="400,150 320,10 310,12" fill={color} />

        <polygon points="400,150 210,185 205,178" fill={color} />
        <polygon points="400,150 250,220 242,214" fill={color} />
        <polygon points="400,150 280,260 270,256" fill={color} />
        <polygon points="400,150 320,290 310,288" fill={color} />

        {/* Longer sharp accent spikes */}
        <polygon points="400,150 120,150 125,148" fill={color} opacity="0.9" />
        <polygon points="400,150 140,105 143,109" fill={color} opacity="0.9" />
        <polygon points="400,150 140,195 143,191" fill={color} opacity="0.9" />
        <polygon points="400,150 190,60 193,64" fill={color} opacity="0.9" />
        <polygon points="400,150 190,240 193,236" fill={color} opacity="0.9" />
      </svg>
    </div>
  );
}
