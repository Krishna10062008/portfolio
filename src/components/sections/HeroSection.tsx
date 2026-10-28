import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { HeroMandalaContainer } from '../hero/HeroMandalaContainer.tsx';
import { WebLines } from '../decorations/WebLines.tsx';
import { SpeedBurst } from '../decorations/SpeedBurst.tsx';
import { ResponsiveImage } from '../primitives/ResponsiveImage.tsx';
import { HireMeButton } from '../HireMeButton.tsx';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      data-tone="hero-split"
      className="relative z-10 w-full min-h-[calc(100vh-68px)] pt-16 sm:pt-20 flex flex-col justify-center overflow-hidden border-b-[3px] border-[#0B0B0C]"
    >
      {/* 2-Column Split matching the portrait diagonal: Left is Ink, Right is Paper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-68px)] items-stretch">
        {/* Left Column: INK SIDE (#0B0B0C) with Live Mandala & Clean Sticker Portrait */}
        <div
          data-tone="ink"
          className="relative lg:col-span-6 bg-[#0B0B0C] text-[#F1E6D0] flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 overflow-hidden border-b-4 lg:border-b-0 lg:border-r-[3px] border-[#0B0B0C]"
        >
          {/* Corner Web Lines in Crimson */}
          <WebLines corner="top-left" size={190} color="#D4161F" opacity={0.85} />

          {/* Chapter indicator */}
          <div className="absolute top-4 left-6 z-20">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#C9922B] bg-[#18181B] px-2.5 py-0.5 border border-[#C9922B]/40 rounded-[2px] font-bold">
              01 / ORIGIN
            </span>
          </div>

          {/* Live Mystic Mandala (Three.js with SVG poster fallback & idle load) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          >
            <HeroMandalaContainer
              onShiftChange={(shiftX, shiftY) => {
                if (!shouldReduceMotion && portraitRef.current) {
                  portraitRef.current.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
                }
              }}
              className="w-full h-full max-w-[620px] max-h-[620px]"
            />
          </motion.div>

          {/* Portrait Container with Sticker-Style White Outline and Direct Ref Shift (zero setState) */}
          <div
            ref={portraitRef}
            className="relative z-10 w-full max-w-xs sm:max-w-sm lg:max-w-md my-auto will-change-transform"
          >
            {/* White sticker outline + comic drop shadow (clean, with bottom block removed) */}
            <div className="relative p-1 bg-white rounded-[2px] border-2 border-[#0B0B0C] shadow-[8px_8px_0px_#C9922B] group overflow-hidden">
              <div className="relative border border-white overflow-hidden bg-[#0B0B0C]">
                <ResponsiveImage
                  src="/assets/aistudio/image_3129c4f9.png"
                  alt="Krishna — Comic Portrait with Mystical Sling-Ring Halo"
                  width={800}
                  height={800}
                  priority={true}
                  data-cursor="view"
                  className="w-full h-auto aspect-square"
                  imageClassName="group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: PAPER SIDE (#F1E6D0) with SpeedBurst, Copy and CTAs */}
        <div
          data-tone="paper"
          className="relative lg:col-span-6 bg-[#F1E6D0] text-[#0B0B0C] flex flex-col justify-center p-6 sm:p-10 lg:p-16 overflow-hidden"
        >
          {/* Comic SpeedBurst in background on paper side */}
          <SpeedBurst
            origin="right"
            color="#D4161F"
            opacity={0.16}
            className="absolute top-0 right-0 w-96 h-80 pointer-events-none"
          />

          <div className="relative z-10 max-w-xl">
            {/* Eyebrow */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="w-2 h-2 bg-[#D4161F] rounded-full inline-block" />
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5A0B0F]">
                AI ENGINEERING STUDENT · FREELANCER · CREATOR
              </span>
            </motion.div>

            {/* Mask-Reveal H1 KRISHNA with Crimson Slash Accent BEFORE Name */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={shouldReduceMotion ? { y: 0 } : { y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl uppercase tracking-tight text-[#0B0B0C] leading-[0.9] flex items-baseline flex-wrap"
              >
                <span className="text-[#D4161F] mr-3 font-normal select-none">/</span>
                <span>KRISHNA</span>
              </motion.h1>
            </div>

            {/* Subline */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="border-l-[3px] border-[#D4161F] pl-4 sm:pl-5 mb-8"
            >
              <p className="font-display text-xl sm:text-2xl uppercase tracking-wide text-[#0B0B0C] leading-snug">
                I turn AI, computer vision and automation into things that feel like magic.
              </p>
              <p className="mt-2 text-sm sm:text-base text-[#0B0B0C]/80 leading-relaxed font-normal">
                Hands-on builder from India exploring real-time gesture perception, neural pipelines, and high-conversion web interfaces.
              </p>
            </motion.div>

            {/* CTAs: Hire me (primary) & See the work (ghost) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4"
            >
              <HireMeButton variant="primary" />

              <a
                href="#work"
                data-cursor="link"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent text-[#0B0B0C] border-2 border-[#0B0B0C] font-mono text-sm sm:text-base font-bold uppercase tracking-wider rounded-[2px] shadow-[4px_4px_0px_#0B0B0C] hover:bg-[#0B0B0C] hover:text-[#F1E6D0] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#0B0B0C] active:translate-x-0.5 active:translate-y-0.5 transition-all select-none"
              >
                <span>See the work</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
