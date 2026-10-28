import { content, type SelectedProject } from '../../content.ts';
import { Section } from '../primitives/Section.tsx';
import { Container } from '../primitives/Container.tsx';
import { Chip } from '../primitives/Chip.tsx';
import { WebLines } from '../decorations/WebLines.tsx';
import { ArrowUpRight, ShieldAlert, FileText } from 'lucide-react';
import { TiltCard } from '../interactive/TiltCard.tsx';
import { FadeUpItem } from '../interactive/FadeUpItem.tsx';

interface SelectedWorkSectionProps {
  onSelectProject: (project: SelectedProject) => void;
}

export function SelectedWorkSection({ onSelectProject }: SelectedWorkSectionProps) {
  return (
    <Section
      id="work"
      tone="paper"
      chapter="03 / SELECTED WORK"
      title="Selected Engineering Projects"
      subtitle="Click any dossier card to inspect the full architecture, system constraints, and deliverables."
      diagonalTop={true}
      className="relative"
    >
      <Container>
        {/* Five project cards: 3 on row 1 (col-span-2 each), 2 wider cards on row 2 (col-span-3 each) */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 sm:gap-8">
          {content.selectedWork.map((project, idx) => {
            const isRowTwoWide = idx >= 3;
            const spanClass = isRowTwoWide ? 'md:col-span-3' : 'md:col-span-2';

            return (
              <FadeUpItem key={project.id} index={idx} className={spanClass}>
                <TiltCard maxTilt={6} tone="paper" className="h-full">
                  <div
                    onClick={() => onSelectProject(project)}
                    data-cursor="view"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectProject(project);
                      }
                    }}
                    className="h-full group cursor-pointer flex flex-col justify-between bg-[#FBF6EC] border-[3px] border-[#0B0B0C] rounded-[2px] shadow-[6px_6px_0px_#0B0B0C] hover:shadow-[10px_10px_0px_#0B0B0C] transition-shadow duration-200 select-none overflow-hidden"
                  >
                {/* Typographic Visual Placeholder Header with card number and WebLines */}
                <div className="relative h-36 bg-[#EFE4CF] border-b-[3px] border-[#0B0B0C] overflow-hidden flex items-center justify-between p-4">
                  {/* WebLines in corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-60">
                    <WebLines corner="top-right" size={130} color="#D4161F" opacity={0.5} />
                  </div>

                  {/* Watermark large index in Anton */}
                  <span className="font-display text-7xl text-[#0B0B0C]/15 select-none tracking-tighter">
                    0{idx + 1}
                  </span>

                  {/* Category and Badges */}
                  <div className="relative z-10 flex flex-col items-end gap-1.5">
                    {project.isResearchOnly ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#D4161F] text-white rounded-[2px] border border-[#0B0B0C] shadow-[2px_2px_0px_#0B0B0C]">
                        <ShieldAlert className="w-3 h-3" />
                        {project.researchBadge || 'RESEARCH'}
                      </span>
                    ) : (
                      <span className="font-mono text-[11px] font-bold text-[#5A0B0F] uppercase tracking-wider bg-[#FBF6EC] px-2 py-0.5 border border-[#0B0B0C] rounded-[2px]">
                        {project.domain}
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-[#0B0B0C]/60 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>CASE FILE // 0{idx + 1}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Title */}
                    <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-[#0B0B0C] group-hover:text-[#D4161F] transition-colors flex items-start justify-between gap-2">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-[#0B0B0C]/40 group-hover:text-[#D4161F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-sm sm:text-base text-[#0B0B0C]/85 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer tech chips and dossier link */}
                  <div className="mt-4 pt-4 border-t-2 border-[#0B0B0C]/10 flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <Chip key={t} tone="paper" variant="default" size="sm">
                          {t}
                        </Chip>
                      ))}
                    </div>

                    <span className="font-mono text-xs font-bold text-[#D4161F] group-hover:underline flex items-center gap-1 shrink-0">
                      <span>Inspect Dossier</span>
                      <span>→</span>
                    </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </FadeUpItem>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
