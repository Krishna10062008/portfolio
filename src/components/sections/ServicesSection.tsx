import { content, type ServiceItem } from '../../content.ts';
import { Section } from '../primitives/Section.tsx';
import { Container } from '../primitives/Container.tsx';
import { Button } from '../primitives/Button.tsx';
import { WebLines } from '../decorations/WebLines.tsx';
import { Globe, Workflow, Bot, Eye, Palette, Film } from 'lucide-react';
import { FadeUpItem } from '../interactive/FadeUpItem.tsx';

const ICON_MAP = {
  Globe,
  Workflow,
  Bot,
  Eye,
  Palette,
  Film,
};

export function ServicesSection() {
  return (
    <Section
      id="services"
      tone="ink"
      chapter="04 / SERVICES"
      title="Services & Capabilities"
      subtitle="Full-stack AI workflows, computer vision prototypes, and high-impact web interfaces tailored for fast-moving teams."
      diagonalTop={true}
      className="relative overflow-hidden"
    >
      <WebLines corner="top-right" size={170} color="#D4161F" opacity={0.6} />

      <Container>
        {/* Six cards with simple line icons, title, and one line each. No prices. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {content.services.map((service: ServiceItem, idx: number) => {
            const Icon = ICON_MAP[service.iconName] || Globe;

            return (
              <FadeUpItem key={service.id} index={idx} className="h-full flex flex-col">
                <div
                  className="flex-1 flex flex-col justify-between p-6 sm:p-7 bg-[#121214] border-[3px] border-[#27272A] hover:border-[#C9922B] rounded-[2px] shadow-[6px_6px_0px_#0B0B0C] hover:shadow-[6px_6px_0px_#C9922B] transition-all duration-200 group"
                >
                  <div>
                    {/* Top bar with simple line icon & index */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-[2px] bg-[#18181B] border-2 border-[#27272A] group-hover:border-[#C9922B] flex items-center justify-center text-[#C9922B] group-hover:text-white group-hover:bg-[#D4161F] transition-colors duration-200 shadow-[3px_3px_0px_#0B0B0C]">
                        <Icon className="w-6 h-6 stroke-[1.75]" />
                      </div>

                      <span className="font-mono text-xs font-bold text-[#C9922B] bg-[#18181B] px-2 py-0.5 rounded-[2px] border border-[#C9922B]/30">
                        // {service.index}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl uppercase tracking-wide text-[#F1E6D0] group-hover:text-[#C9922B] transition-colors">
                      {service.title}
                    </h3>

                    {/* One line description */}
                    <p className="mt-3 text-sm text-[#F1E6D0]/80 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Card footer CTA */}
                  <div className="mt-6 pt-4 border-t border-[#27272A] flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#F1E6D0]/50 font-bold">
                      AVAILABLE FOR HIRE
                    </span>
                    <a
                      href="/hire"
                      data-cursor="hire"
                      className="font-mono text-xs font-bold uppercase text-[#D4161F] group-hover:text-[#f87171] group-hover:underline flex items-center gap-1"
                    >
                      <span>Hire @krishna</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </FadeUpItem>
            );
          })}
        </div>

        {/* Custom Scope Callout */}
        <div className="mt-12 p-8 bg-[#18181B] border-[3px] border-[#C9922B] rounded-[2px] shadow-[6px_6px_0px_#0B0B0C] flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase font-bold text-[#D4161F] tracking-wider block mb-1">
              CUSTOM WORKFLOWS & BESPOKE BUILDS
            </span>
            <h4 className="font-display text-2xl sm:text-3xl uppercase text-[#F1E6D0]">
              Need a hybrid prototype or custom pipeline?
            </h4>
            <p className="text-sm text-[#F1E6D0]/80 font-normal mt-2 leading-relaxed">
              From real-time sensor processing to custom LLM prompts and production web design, let's spec out the architecture together.
            </p>
          </div>
          <Button
            as="a"
            href="/hire"
            variant="primary"
            size="lg"
            data-cursor="hire"
            className="shrink-0"
          >
            Start a Conversation
          </Button>
        </div>
      </Container>
    </Section>
  );
}
