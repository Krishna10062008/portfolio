import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ShieldCheck, Layers, HelpCircle, Lightbulb } from 'lucide-react';
import type { SelectedProject } from '../content.ts';
import { Chip } from './primitives/Chip.tsx';
import { WebLines } from './decorations/WebLines.tsx';
import { useFocusTrap } from '../hooks/useFocusTrap.ts';

interface CaseFileDrawerProps {
  project: SelectedProject | null;
  onClose: () => void;
}

export function CaseFileDrawer({ project, onClose }: CaseFileDrawerProps) {
  const drawerRef = useFocusTrap(Boolean(project), onClose);
  // Sync URL hash with project deep link (#work/<id>) and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Deep link sync
      if (window.location.hash !== `#work/${project.id}`) {
        window.history.pushState(null, '', `#work/${project.id}`);
      }
    } else {
      document.body.style.overflow = '';
      if (window.location.hash.startsWith('#work/')) {
        window.history.replaceState(null, '', '#work');
      }
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  // Filter links: strictly no github and no netlify
  const validLinks = project?.caseFile.links?.filter(
    (l) => !l.url.includes('github.com') && !l.url.includes('netlify.app') && l.url.startsWith('http')
  );

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[1000] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0B0C]/80 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-file-title"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-xl bg-[#F1E6D0] text-[#0B0B0C] border-l-[3px] border-[#0B0B0C] shadow-[-10px_0px_30px_rgba(0,0,0,0.5)] z-10 flex flex-col h-full overflow-y-auto outline-none"
          >
            {/* Top Comic Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#E5D7BF] border-b-[3px] border-[#0B0B0C]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-[#0B0B0C] text-[#F1E6D0] px-2 py-0.5 rounded-[2px]">
                  CASE FILE
                </span>
                <span className="font-mono text-xs text-[#5A0B0F] font-semibold">
                  {project.domain}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close case file"
                data-cursor="link"
                className="p-1 rounded-[2px] border-2 border-[#0B0B0C] bg-[#F1E6D0] hover:bg-[#D4161F] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-7 flex-1 relative">
              {/* Subtle corner webline decoration */}
              <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-40">
                <WebLines corner="top-right" size={120} color="#D4161F" opacity={0.5} />
              </div>

              {/* Header */}
              <div>
                {project.isResearchOnly && (
                  <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#D4161F] text-white font-mono text-xs font-black tracking-wider rounded-[2px] border-2 border-[#0B0B0C] shadow-[3px_3px_0px_#0B0B0C]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{project.researchBadge || 'RESEARCH'}</span>
                  </div>
                )}
                <h3 id="case-file-title" className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-[#0B0B0C]">
                  {project.title}
                </h3>
                <p className="mt-3 text-base text-[#0B0B0C]/85 font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* 1. What Section (or What I explored for JARVIS) */}
              <div className="p-5 bg-white border-2 border-[#0B0B0C] rounded-[2px] shadow-[4px_4px_0px_#0B0B0C]">
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-[#D4161F] mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#D4161F]" />
                  <span>{project.isResearchOnly ? 'What I Explored' : 'What'}</span>
                </h4>
                <p className="text-sm text-[#0B0B0C]/90 leading-relaxed font-normal">
                  {project.caseFile.what}
                </p>
              </div>

              {/* 2. How Section (or Concept for JARVIS) */}
              <div className="p-5 bg-[#EFE4CF] border-2 border-[#0B0B0C] rounded-[2px] shadow-[4px_4px_0px_#0B0B0C]">
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-[#5A0B0F] mb-2 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#5A0B0F]" />
                  <span>{project.isResearchOnly ? 'Concept & Architecture' : 'How'}</span>
                </h4>
                <p className="text-sm text-[#0B0B0C]/90 leading-relaxed font-normal">
                  {project.isResearchOnly ? project.caseFile.concept : project.caseFile.how}
                </p>
              </div>

              {/* 3. Stack Section */}
              <div className="p-5 bg-[#FBF6EC] border-2 border-[#0B0B0C] rounded-[2px] shadow-[4px_4px_0px_#0B0B0C]">
                <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-[#0B0B0C] mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#0B0B0C]" />
                  <span>Stack</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.caseFile.stack.map((t) => (
                    <Chip key={t} tone="paper" variant="default" size="sm">
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              {project.caseFile.keyDeliverables && project.caseFile.keyDeliverables.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[#0B0B0C] mb-3">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {project.caseFile.keyDeliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#0B0B0C]/85">
                        <span className="font-mono text-xs font-bold text-[#D4161F] mt-0.5">[{idx + 1}]</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 4. Links Section (Only rendered if genuine external links exist, never GitHub/Netlify) */}
              {validLinks && validLinks.length > 0 && (
                <div className="pt-2">
                  <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[#0B0B0C] mb-3">
                    Project Links
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {validLinks.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="link"
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold px-3 py-2 bg-white border-2 border-[#0B0B0C] rounded-[2px] shadow-[2px_2px_0px_#0B0B0C] hover:bg-[#D4161F] hover:text-white transition-colors"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Comic Bar */}
            <div className="p-4 bg-[#E5D7BF] border-t-[3px] border-[#0B0B0C] flex items-center justify-between">
              <span className="font-mono text-xs text-[#0B0B0C]/70">
                DEEP LINK // #work/{project.id}
              </span>
              <button
                onClick={onClose}
                className="font-mono text-xs font-bold text-[#D4161F] hover:underline"
              >
                Close Dossier ✕
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
