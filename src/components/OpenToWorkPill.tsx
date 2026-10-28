import { useState } from 'react';

interface OpenToWorkPillProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function OpenToWorkPill({ className = '', size = 'sm' }: OpenToWorkPillProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const sizeClasses = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs sm:text-sm';

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setShowTooltip((prev) => !prev)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-describedby="open-to-work-tooltip"
        data-cursor="link"
        className={`inline-flex items-center gap-2 rounded-[2px] bg-[#121214] border border-[#27272A] hover:border-[#3DDC84]/50 transition-colors cursor-pointer select-none font-mono ${sizeClasses}`}
      >
        <span
          className="w-2 h-2 rounded-full bg-[#3DDC84] inline-block shadow-[0_0_8px_#3DDC84] animate-pulse"
          aria-hidden="true"
        />
        <span className="font-bold tracking-wider text-[#F1E6D0] uppercase">
          OPEN TO WORK
        </span>
      </button>

      {/* Accessible Comic Tooltip */}
      {showTooltip && (
        <div
          id="open-to-work-tooltip"
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-64 p-3 bg-[#F1E6D0] text-[#0B0B0C] border-2 border-[#0B0B0C] shadow-[4px_4px_0px_#0B0B0C] rounded-[2px] text-xs font-mono leading-relaxed pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95"
        >
          <div className="font-bold text-[#D4161F] uppercase mb-0.5">Availability</div>
          <div>Freelance · Full-time · Internships · Collaborations. Open to work in any form.</div>
          {/* Arrow */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#F1E6D0] border-t-2 border-l-2 border-[#0B0B0C] rotate-45" />
        </div>
      )}
    </div>
  );
}
