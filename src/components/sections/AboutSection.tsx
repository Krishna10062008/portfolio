import { content } from '../../content.ts';
import { Section } from '../primitives/Section.tsx';
import { Container } from '../primitives/Container.tsx';
import { Button } from '../primitives/Button.tsx';
import { Chip } from '../primitives/Chip.tsx';
import { WebLines } from '../decorations/WebLines.tsx';
import { MandalaRing } from '../decorations/MandalaRing.tsx';
import { Quote, Sparkles, Youtube } from 'lucide-react';
import { FadeUpItem } from '../interactive/FadeUpItem.tsx';

export function AboutSection() {
  return (
    <Section
      id="about"
      tone="ink"
      chapter="06 / ABOUT"
      title="The Origin Story"
      subtitle="From rural roots to state-of-the-art vision models and real-world deployment."
      diagonalTop={true}
      className="relative overflow-hidden"
    >
      <WebLines corner="bottom-left" size={190} color="#D4161F" opacity={0.65} />
      <WebLines corner="top-right" size={140} color="#C9922B" opacity={0.35} />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Face Crop of the Portrait Art with Comic Border & Sticker Outline (4 cols) */}
          <FadeUpItem index={0} className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative group">
              {/* Gold mandala ring behind face crop */}
              <div className="absolute -inset-4 sm:-inset-6 flex items-center justify-center opacity-40 pointer-events-none">
                <MandalaRing size={320} color="#C9922B" glow={true} />
              </div>

              {/* Comic sticker frame with hard offset shadow */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-[2px] bg-[#121214] border-[3px] border-[#C9922B] shadow-[8px_8px_0px_#C9922B] overflow-hidden p-1.5">
                <div className="w-full h-full rounded-[2px] overflow-hidden border-2 border-white bg-black relative">
                  <img
                    src="/assets/aistudio/image_3129c4f9.png"
                    alt="Krishna - AI Engineering Student & Builder"
                    className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Comic ink bottom corner tag */}
                  <div className="absolute bottom-2 left-2 z-10">
                    <span className="font-mono text-[10px] font-bold text-[#F1E6D0] bg-[#0B0B0C]/90 px-2 py-0.5 border border-[#C9922B]/60 rounded-[2px]">
                      KRISHNA // INDIA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUpItem>

          {/* Right Column: Narrative Draft & 3 Fact Chips (8 cols) */}
          <FadeUpItem index={1} className="lg:col-span-8 space-y-6">
            {/* 3 Fact Chips */}
            <div className="flex flex-wrap items-center gap-2.5">
              {content.identity.aboutFactChips.map((chipText) => (
                <Chip
                  key={chipText}
                  tone="ink"
                  variant="gold"
                  size="md"
                  className="border-2 border-[#C9922B] shadow-[3px_3px_0px_#C9922B] font-bold"
                >
                  {chipText}
                </Chip>
              ))}
            </div>

            {/* About Story Box */}
            <div className="relative p-6 sm:p-8 bg-[#121214] border-[3px] border-[#C9922B] rounded-[2px] shadow-[6px_6px_0px_#C9922B]">
              <Quote className="w-10 h-10 text-[#D4161F]/40 mb-3" />
              <blockquote className="font-display text-2xl sm:text-3xl text-[#F1E6D0] leading-snug tracking-wide uppercase">
                "{content.identity.aboutStory}"
              </blockquote>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button
                as="a"
                href="/hire"
                variant="primary"
                size="md"
                data-cursor="hire"
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hire @krishna</span>
              </Button>

              <Button
                as="a"
                href={content.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="md"
                data-cursor="link"
                className="flex items-center gap-2"
              >
                <Youtube className="w-4 h-4 text-[#D4161F]" />
                <span>The ZeroShot on YouTube</span>
              </Button>
            </div>
          </FadeUpItem>
        </div>
      </Container>
    </Section>
  );
}
