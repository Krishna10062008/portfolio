import { useState, useEffect } from 'react';
import { content, type FeaturedBuild } from '../../content.ts';
import { Section } from '../primitives/Section.tsx';
import { Container } from '../primitives/Container.tsx';
import { Chip } from '../primitives/Chip.tsx';
import { Button } from '../primitives/Button.tsx';
import { WebLines } from '../decorations/WebLines.tsx';
import { Play, Sparkles, Youtube, X, Radio, Wifi, Tv } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard } from '../interactive/TiltCard.tsx';
import { FadeUpItem } from '../interactive/FadeUpItem.tsx';
import { useFocusTrap } from '../../hooks/useFocusTrap.ts';
import { ThanosSnapParticleEffect } from '../interactive/ThanosSnapParticleEffect.tsx';

export function BuildsSection() {
  const [activeModalBuild, setActiveModalBuild] = useState<FeaturedBuild | null>(null);
  const modalRef = useFocusTrap(Boolean(activeModalBuild), () => setActiveModalBuild(null));
  const [gestureActive, setGestureActive] = useState(false);
  const [snapEffect, setSnapEffect] = useState(false);
  const [pingActive, setPingActive] = useState(false);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalBuild(null);
    };
    if (activeModalBuild) {
      document.body.style.overflow = 'hidden';
      setGestureActive(false);
      setSnapEffect(false);
      setPingActive(false);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalBuild]);

  const [mandalaBuild, thanosBuild, ottBuild] = content.featuredBuilds;

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url || url.includes('TODO')) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1`
      : null;
  };

  return (
    <Section
      id="builds"
      tone="ink"
      chapter="02 / BUILDS"
      title="Builds from The ZeroShot"
      subtitle="Distinctive computer vision prototypes, gesture engines, and local streaming pipelines engineered for real-time performance."
      diagonalTop={true}
      className="relative overflow-hidden"
    >
      {/* Decorative corner web lines: left corner spiderweb removed */}
      <WebLines corner="bottom-right" size={220} color="#D4161F" opacity={0.65} />

      <Container>
        {/* Top Channel Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-[#C9922B]/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4161F] animate-pulse" />
            <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#C9922B]">
              THE ZEROSHOT LAB DEMOS
            </span>
          </div>
          <Button
            as="a"
            href={content.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            data-cursor="link"
            className="flex items-center gap-2"
          >
            <Youtube className="w-4 h-4 text-[#D4161F]" />
            <span>The ZeroShot YouTube</span>
          </Button>
        </div>

        {/* 3 Equal-Sized Video Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10 items-stretch">
          {/* Card 1: Doctor Strange Mandala */}
          {mandalaBuild && (
            <FadeUpItem index={0} className="flex flex-col h-full">
              <TiltCard maxTilt={6} tone="ink" className="flex-1 flex flex-col h-full">
                <div
                  onClick={() => setActiveModalBuild(mandalaBuild)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalBuild(mandalaBuild);
                    }
                  }}
                  data-cursor="link"
                  className="flex-1 flex flex-col bg-[#121214] border-[3px] border-[#C9922B] rounded-[2px] shadow-[6px_6px_0px_#C9922B] overflow-hidden group hover:shadow-[10px_10px_0px_#C9922B] transition-shadow duration-200 cursor-pointer select-none"
                >
                  {/* 16:9 Thumbnail with live spinning fiery Doctor Strange Mandala (no center play button) */}
                  <div className="relative aspect-video w-full bg-[#070708] border-b-[3px] border-[#C9922B] overflow-hidden flex items-center justify-center">
                    {/* Background radial glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,22,31,0.35)_0%,rgba(201,146,43,0.15)_45%,transparent_70%)] group-hover:opacity-100 transition-opacity" />

                    {/* Fiery Sling-Ring Mandala with CSS spin, faster on hover */}
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_35px_rgba(255,140,0,0.6)] group-hover:shadow-[0_0_60px_rgba(255,140,0,1)] transition-shadow duration-300">
                      <img
                        src="/assets/aistudio/image_f6fe4e4d.png"
                        alt="Doctor Strange Sling Ring Mandala"
                        className="w-full h-full object-cover animate-[spin_18s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite] group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Central glowing core pulse */}
                      <div className="absolute w-16 h-16 rounded-full bg-[radial-gradient(circle,rgba(255,200,80,0.6)_0%,rgba(212,22,31,0.3)_60%,transparent_100%)] group-hover:scale-150 animate-pulse pointer-events-none transition-transform duration-300" />
                    </div>

                    {/* Badge top-left */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                      <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#0B0B0C]/90 text-[#F1E6D0] border border-[#C9922B]/60 rounded-[2px]">
                        {mandalaBuild.badge}
                      </span>
                    </div>

                    {/* Index top-right */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="font-mono text-xs font-bold text-[#0B0B0C] bg-[#C9922B] px-1.5 py-0.5 rounded-[2px] shadow-[2px_2px_0px_#0B0B0C]">
                        01
                      </span>
                    </div>

                    {/* Bottom-right action pill: "OPEN" */}
                    <div className="absolute bottom-2.5 right-2.5 z-10 px-2.5 py-1 bg-[#D4161F] text-white font-mono text-xs font-bold uppercase rounded-[2px] shadow-[2px_2px_0px_#0B0B0C] group-hover:scale-105 transition-transform">
                      OPEN
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="font-mono text-xs text-[#C9922B] font-semibold block mb-1">
                        REAL-TIME COMPUTER VISION
                      </span>
                      <h3 className="font-display text-2xl uppercase tracking-wide text-[#F1E6D0] group-hover:text-[#C9922B] transition-colors">
                        {mandalaBuild.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#F1E6D0]/80 leading-relaxed font-normal">
                        {mandalaBuild.summary}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-[#27272A]">
                      <div className="flex flex-wrap gap-1.5">
                        {mandalaBuild.tech.map((t) => (
                          <Chip key={t} tone="ink" variant="default" size="sm">
                            {t}
                          </Chip>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1 font-mono text-xs font-bold uppercase">
                        <span className="text-[#D4161F] group-hover:underline">
                          OPEN
                        </span>
                        <span className="text-[#F1E6D0]/60">Gesture Detection</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </FadeUpItem>
          )}

          {/* Card 2: Thanos Snap (Transparent Gauntlet & Zoomed) */}
          {thanosBuild && (
            <FadeUpItem index={1} className="flex flex-col h-full">
              <TiltCard maxTilt={6} tone="ink" className="flex-1 flex flex-col h-full">
                <div
                  onClick={() => setActiveModalBuild(thanosBuild)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalBuild(thanosBuild);
                    }
                  }}
                  data-cursor="link"
                  className="flex-1 flex flex-col bg-[#121214] border-[3px] border-[#C9922B] rounded-[2px] shadow-[6px_6px_0px_#C9922B] overflow-hidden group hover:shadow-[10px_10px_0px_#C9922B] transition-shadow duration-200 cursor-pointer select-none"
                >
                  {/* 16:9 Thumbnail with Zoomed Transparent Infinity Gauntlet */}
                  <div className="relative aspect-video w-full bg-[#18181B] border-b-[3px] border-[#C9922B] overflow-hidden flex items-center justify-center p-3">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,146,43,0.3)_0%,rgba(212,22,31,0.15)_50%,transparent_75%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(201,146,43,0.5)_0%,rgba(212,22,31,0.25)_50%,transparent_75%)] transition-colors" />

                    {/* Gauntlet: only gauntlet, no yellow background, nicely zoomed */}
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <img
                        src="/assets/aistudio/thanos_gauntlet.png"
                        alt="Thanos Infinity Gauntlet"
                        className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(201,146,43,0.85)] group-hover:drop-shadow-[0_0_35px_rgba(212,22,31,1)] group-hover:scale-120 group-hover:rotate-6 transition-all duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Badge top-left */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#0B0B0C]/90 text-[#F1E6D0] border border-[#C9922B]/60 rounded-[2px]">
                        {thanosBuild.badge}
                      </span>
                    </div>

                    {/* Index top-right */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="font-mono text-xs font-bold text-[#0B0B0C] bg-[#C9922B] px-1.5 py-0.5 rounded-[2px] shadow-[2px_2px_0px_#0B0B0C]">
                        02
                      </span>
                    </div>

                    {/* Bottom-right action pill: "OPEN" */}
                    <div className="absolute bottom-2.5 right-2.5 z-10 px-2.5 py-1 bg-[#D4161F] text-white font-mono text-xs font-bold uppercase rounded-[2px] shadow-[2px_2px_0px_#0B0B0C] group-hover:scale-105 transition-transform">
                      OPEN
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="font-mono text-xs text-[#C9922B] font-semibold block mb-1">
                        GESTURE PARTICLE FX
                      </span>
                      <h3 className="font-display text-2xl uppercase tracking-wide text-[#F1E6D0] group-hover:text-[#C9922B] transition-colors">
                        {thanosBuild.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#F1E6D0]/80 leading-relaxed font-normal">
                        {thanosBuild.summary}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-[#27272A]">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {thanosBuild.tech.map((t) => (
                            <Chip key={t} tone="ink" variant="default" size="sm">
                              {t}
                            </Chip>
                          ))}
                        </div>
                        <ThanosSnapParticleEffect />
                      </div>

                      <div className="flex items-center justify-between pt-1 font-mono text-xs font-bold uppercase">
                        <span className="text-[#D4161F] group-hover:underline">
                          OPEN
                        </span>
                        <span className="text-[#F1E6D0]/60">Kinematics Pipeline</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </FadeUpItem>
          )}

          {/* Card 3: ZeroStreamz (Home OTT with stylized logo) */}
          {ottBuild && (
            <FadeUpItem index={2} className="flex flex-col h-full">
              <TiltCard maxTilt={6} tone="ink" className="flex-1 flex flex-col h-full">
                <div
                  onClick={() => setActiveModalBuild(ottBuild)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveModalBuild(ottBuild);
                    }
                  }}
                  data-cursor="link"
                  className="flex-1 flex flex-col bg-[#121214] border-[3px] border-[#C9922B] rounded-[2px] shadow-[6px_6px_0px_#C9922B] overflow-hidden group hover:shadow-[10px_10px_0px_#C9922B] transition-shadow duration-200 cursor-pointer select-none"
                >
                  {/* 16:9 Thumbnail with ZeroStreamz Stylized Logo */}
                  <div className="relative aspect-video w-full bg-[#161619] border-b-[3px] border-[#C9922B] overflow-hidden flex flex-col items-center justify-center p-3">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,22,31,0.25)_0%,rgba(11,11,12,0.85)_70%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(212,22,31,0.45)_0%,rgba(11,11,12,0.85)_70%)] transition-colors" />

                    {/* Stylized Red ZeroStreamz Logo */}
                    <div className="relative flex flex-col items-center justify-center space-y-2 z-0">
                      <div className="relative w-24 h-20 sm:w-28 sm:h-24 flex items-center justify-center">
                        <img
                          src="/assets/aistudio/zerostreamz_logo.png"
                          alt="ZeroStreamz Logo"
                          className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(212,22,31,0.85)] group-hover:drop-shadow-[0_0_35px_rgba(212,22,31,1)] group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm tracking-widest text-[#F1E6D0] uppercase">
                          ZEROSTREAMZ
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC84] animate-pulse" />
                      </div>
                    </div>

                    {/* Badge top-left */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#0B0B0C]/90 text-[#3DDC84] border border-[#3DDC84]/60 rounded-[2px]">
                        {ottBuild.badge}
                      </span>
                    </div>

                    {/* Index top-right */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="font-mono text-xs font-bold text-[#0B0B0C] bg-[#C9922B] px-1.5 py-0.5 rounded-[2px] shadow-[2px_2px_0px_#0B0B0C]">
                        03
                      </span>
                    </div>

                    {/* Bottom-right action pill: "OPEN" */}
                    <div className="absolute bottom-2.5 right-2.5 z-10 px-2.5 py-1 bg-[#D4161F] text-white font-mono text-xs font-bold uppercase rounded-[2px] shadow-[2px_2px_0px_#0B0B0C] group-hover:scale-105 transition-transform">
                      OPEN
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="font-mono text-xs text-[#3DDC84] font-semibold block mb-1">
                        LOCAL NETWORK STREAMING
                      </span>
                      <h3 className="font-display text-2xl uppercase tracking-wide text-[#F1E6D0] group-hover:text-[#C9922B] transition-colors">
                        {ottBuild.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#F1E6D0]/80 leading-relaxed font-normal">
                        {ottBuild.summary}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-[#27272A]">
                      <div className="flex flex-wrap gap-1.5">
                        {ottBuild.tech.map((t) => (
                          <Chip key={t} tone="ink" variant="default" size="sm">
                            {t}
                          </Chip>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1 font-mono text-xs font-bold uppercase">
                        <span className="text-[#D4161F] group-hover:underline">
                          OPEN
                        </span>
                        <span className="text-[#F1E6D0]/60">Static Daemon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </FadeUpItem>
          )}
        </div>

        {/* Channel Banner Callout */}
        <div className="mt-12 p-6 bg-[#18181B] border-2 border-[#C9922B]/50 rounded-[2px] shadow-[6px_6px_0px_#C9922B] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4161F] text-white flex items-center justify-center font-display text-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-xl uppercase text-[#F1E6D0]">
                Explore More on The ZeroShot
              </h4>
              <p className="text-xs font-mono text-[#F1E6D0]/70">
                Weekly computer vision breakdowns, gesture engines, and automation pipelines.
              </p>
            </div>
          </div>
          <Button
            as="a"
            href={content.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            data-cursor="link"
          >
            The ZeroShot YouTube
          </Button>
        </div>
      </Container>

      {/* Video Modal (Loads youtube-nocookie embed on click, or rich comic interactive player) */}
      <AnimatePresence>
        {activeModalBuild && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalBuild(null)}
              className="fixed inset-0 bg-[#0B0B0C]/85 backdrop-blur-sm cursor-pointer"
              aria-hidden="true"
            />

            {/* Modal Dialog */}
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="video-modal-title"
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-[#121214] border-[3px] border-[#C9922B] rounded-[2px] shadow-[10px_10px_0px_#C9922B] z-10 overflow-hidden flex flex-col outline-none"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#18181B] border-b-2 border-[#C9922B]">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold bg-[#D4161F] text-white px-2 py-0.5 rounded-[2px]">
                    THE ZEROSHOT
                  </span>
                  <span className="font-mono text-xs text-[#C9922B] font-semibold">
                    {activeModalBuild.badge}
                  </span>
                </div>
                <button
                  onClick={() => setActiveModalBuild(null)}
                  aria-label="Close video player"
                  data-cursor="link"
                  className="p-1 rounded-[2px] border border-[#C9922B]/60 text-[#F1E6D0] hover:bg-[#D4161F] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Embed or Interactive Player */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                {getYoutubeEmbedUrl(activeModalBuild.youtubeUrl) ? (
                  <iframe
                    src={getYoutubeEmbedUrl(activeModalBuild.youtubeUrl)!}
                    title={activeModalBuild.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[radial-gradient(ellipse_at_center,rgba(212,22,31,0.25)_0%,rgba(11,11,12,0.95)_75%)] overflow-hidden">
                    {activeModalBuild.id === 'mandala' ? (
                      <div className="flex flex-col items-center mb-3">
                        <div className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${
                          gestureActive
                            ? 'shadow-[0_0_60px_rgba(255,140,0,1)] scale-110'
                            : 'shadow-[0_0_30px_rgba(255,140,0,0.6)]'
                        }`}>
                          <img
                            src="/assets/aistudio/image_f6fe4e4d.png"
                            alt="Doctor Strange Mandala"
                            className={`w-full h-full object-cover ${
                              gestureActive
                                ? 'animate-[spin_4s_linear_infinite]'
                                : 'animate-[spin_12s_linear_infinite]'
                            }`}
                          />
                        </div>
                        {/* Interactive toggle */}
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setGestureActive((prev) => !prev)}
                            className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-[2px] border-2 transition-all cursor-pointer ${
                              gestureActive
                                ? 'bg-[#3DDC84] text-[#0B0B0C] border-[#0B0B0C] shadow-[2px_2px_0px_#0B0B0C]'
                                : 'bg-[#D4161F] text-white border-white shadow-[2px_2px_0px_#C9922B]'
                            }`}
                          >
                            {gestureActive ? 'GESTURE DETECTED: 99.8% CONFIDENCE' : 'SIMULATE HAND GESTURE'}
                          </button>
                        </div>
                      </div>
                    ) : activeModalBuild.id === 'thanos-snap' ? (
                      <div className="flex flex-col items-center mb-3">
                        <div className={`relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center transition-transform duration-300 ${
                          snapEffect ? 'scale-125 rotate-6' : 'hover:scale-105'
                        }`}>
                          <img
                            src="/assets/aistudio/thanos_gauntlet.png"
                            alt="Thanos Infinity Gauntlet"
                            className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(201,146,43,0.9)]"
                          />
                        </div>
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={() => setSnapEffect((prev) => !prev)}
                            className={`px-3 py-1 text-xs font-mono font-bold uppercase rounded-[2px] border-2 transition-all cursor-pointer ${
                              snapEffect
                                ? 'bg-[#C9922B] text-[#0B0B0C] border-white shadow-[2px_2px_0px_#D4161F]'
                                : 'bg-[#D4161F] text-white border-white shadow-[2px_2px_0px_#C9922B]'
                            }`}
                          >
                            {snapEffect ? 'DUST DISPERSION ACTIVE (PERFECTLY BALANCED)' : 'TRIGGER SNAP GESTURE'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center mb-3">
                        <div className="relative w-28 h-20 sm:w-32 sm:h-24 flex items-center justify-center mb-2">
                          <img
                            src="/assets/aistudio/zerostreamz_logo.png"
                            alt="ZeroStreamz Logo"
                            className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(212,22,31,0.9)]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setPingActive((prev) => !prev)}
                          className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-[2px] bg-[#121214] text-[#3DDC84] border border-[#3DDC84] shadow-[2px_2px_0px_#3DDC84] cursor-pointer"
                        >
                          {pingActive ? 'STREAM ACTIVE: 192.168.1.100 (0.2ms latency)' : 'PING LOCAL FASTAPI STREAM'}
                        </button>
                      </div>
                    )}

                    <h4 className="font-display text-2xl sm:text-3xl uppercase text-[#F1E6D0] tracking-wide mt-1">
                      {activeModalBuild.title}
                    </h4>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#F1E6D0]/80 max-w-lg font-normal leading-relaxed">
                      {activeModalBuild.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3 justify-center items-center">
                      <Button
                        as="a"
                        href={content.links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        size="md"
                        data-cursor="link"
                        className="flex items-center gap-2"
                      >
                        <Youtube className="w-4 h-4" />
                        <span>The ZeroShot YouTube</span>
                      </Button>
                      <Button
                        onClick={() => setActiveModalBuild(null)}
                        variant="ghost"
                        size="md"
                        data-cursor="link"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Body Info */}
              <div className="p-5 sm:p-6 bg-[#121214] border-t-2 border-[#27272A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 id="video-modal-title" className="font-display text-xl uppercase text-[#F1E6D0]">
                    {activeModalBuild.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {activeModalBuild.tech.map((t) => (
                      <Chip key={t} tone="ink" variant="default" size="sm">
                        {t}
                      </Chip>
                    ))}
                  </div>
                </div>

                <Button
                  as="a"
                  href={content.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                  size="sm"
                  data-cursor="link"
                  className="shrink-0"
                >
                  Channel: The ZeroShot
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
