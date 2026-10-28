import { content } from '../../content.ts';
import { Section } from '../primitives/Section.tsx';
import { Container } from '../primitives/Container.tsx';
import { Chip } from '../primitives/Chip.tsx';
import { SpeedBurst } from '../decorations/SpeedBurst.tsx';
import { Terminal, Cpu, Sparkles } from 'lucide-react';
import { FadeUpItem } from '../interactive/FadeUpItem.tsx';

export function ToolbeltSection() {
  return (
    <Section
      id="toolbelt"
      tone="paper"
      chapter="05 / TOOLBELT"
      title="The Technical Toolbelt"
      subtitle="Hard-coded engineering foundations paired with cutting-edge AI acceleration workflows."
      diagonalTop={true}
      className="relative overflow-hidden"
    >
      <SpeedBurst
        origin="left"
        color="#D4161F"
        opacity={0.12}
        className="absolute bottom-0 left-0 w-72 h-56 pointer-events-none"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Core Engineering Stack (7 cols) */}
          <FadeUpItem index={0} className="lg:col-span-7 flex flex-col">
            <div className="flex-1 bg-[#FBF6EC] border-[3px] border-[#0B0B0C] p-6 sm:p-8 rounded-[2px] shadow-[6px_6px_0px_#0B0B0C] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-[#0B0B0C]/15">
                  <Terminal className="w-5 h-5 text-[#D4161F]" />
                  <h3 className="font-display text-2xl uppercase tracking-wide text-[#0B0B0C]">
                    Core Engineering Stack
                  </h3>
                </div>
                <p className="text-sm text-[#0B0B0C]/80 leading-relaxed font-normal mb-6">
                  Languages, computer vision libraries, frontend frameworks, and embedded runtimes used daily across active client and lab projects.
                </p>

                {/* Core stack text chips */}
                <div className="flex flex-wrap gap-2.5">
                  {content.toolbelt.core.map((tech) => (
                    <Chip
                      key={tech}
                      tone="paper"
                      variant="default"
                      size="md"
                      className="border-2 border-[#0B0B0C] shadow-[2px_2px_0px_#0B0B0C] hover:bg-white transition-colors"
                    >
                      {tech}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-[#0B0B0C]/15 flex items-center justify-between text-xs font-mono text-[#0B0B0C]/70">
                <span className="font-bold text-[#5A0B0F]">FULL VERTICAL INTEGRATION</span>
                <span>Hardware → Vision → Web</span>
              </div>
            </div>
          </FadeUpItem>

          {/* AI Workflow & Automation (5 cols) */}
          <FadeUpItem index={1} className="lg:col-span-5 flex flex-col">
            <div className="flex-1 bg-[#FBF6EC] border-[3px] border-[#0B0B0C] p-6 sm:p-8 rounded-[2px] shadow-[6px_6px_0px_#0B0B0C] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-[#0B0B0C]/15">
                  <Cpu className="w-5 h-5 text-[#C9922B]" />
                  <h3 className="font-display text-2xl uppercase tracking-wide text-[#0B0B0C]">
                    AI & Automation Workflow
                  </h3>
                </div>
                <p className="text-sm text-[#0B0B0C]/80 leading-relaxed font-normal mb-6">
                  Next-generation synthetic copilots, agent harnesses, and webhook dispatchers that 10x shipping velocity.
                </p>

                {/* AI workflow text chips (strictly text chips, no logos) */}
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {content.toolbelt.aiWorkflow.map((tool) => (
                    <Chip
                      key={tool}
                      tone="paper"
                      variant="gold"
                      size="md"
                      className="border-2 border-[#0B0B0C] shadow-[2px_2px_0px_#0B0B0C] font-semibold"
                    >
                      {tool}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Mandatory tagline under AI workflow chips */}
              <div className="pt-4 border-t-2 border-[#0B0B0C] flex items-center gap-2 font-mono text-sm font-bold text-[#D4161F]">
                <Sparkles className="w-4 h-4 text-[#D4161F]" />
                <span>{content.toolbelt.aiWorkflowTagline}</span>
              </div>
            </div>
          </FadeUpItem>
        </div>
      </Container>
    </Section>
  );
}
