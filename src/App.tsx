/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/sections/HeroSection.tsx';
import { BuildsSection } from './components/sections/BuildsSection.tsx';
import { SelectedWorkSection } from './components/sections/SelectedWorkSection.tsx';
import { ServicesSection } from './components/sections/ServicesSection.tsx';
import { ToolbeltSection } from './components/sections/ToolbeltSection.tsx';
import { AboutSection } from './components/sections/AboutSection.tsx';
import { ContactSection } from './components/sections/ContactSection.tsx';
import { CaseFileDrawer } from './components/CaseFileDrawer.tsx';
import { SlingRingCursor } from './components/interactive/SlingRingCursor.tsx';
import { ScrollProgressBar } from './components/interactive/ScrollProgressBar.tsx';
import { PersistentMandala } from './components/interactive/PersistentMandala.tsx';
import { SkipLink } from './components/primitives/SkipLink.tsx';
import { HireMeButton } from './components/HireMeButton.tsx';
import { useMotionPrefs } from './hooks/useMotionPrefs.ts';
import { content, type SelectedProject } from './content.ts';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);
  const [showFloatingHire, setShowFloatingHire] = useState(false);
  const { enableSmoothScroll } = useMotionPrefs();

  // Sync deep link hash like #work/ai-radar
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#work/')) {
        const projectId = hash.replace('#work/', '');
        const found = content.selectedWork.find((p) => p.id === projectId);
        if (found) {
          setSelectedProject(found);
        }
      } else if (!hash.startsWith('#work/')) {
        setSelectedProject((prev) => (prev ? null : prev));
      }
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  useEffect(() => {
    // Show floating bottom-right Hire Me button on mobile after scrolling past hero (guarded state update)
    let isPast = false;
    const handleScroll = () => {
      const past = window.scrollY > 400;
      if (past !== isPast) {
        isPast = past;
        setShowFloatingHire(past);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Single Lenis instance driven by its own built-in loop (autoRaf: true)
    if (!enableSmoothScroll) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.14, // Snappy lerp 0.14 per specification
      smoothWheel: true,
      syncTouch: false, // native touch scrolling on mobile
      stopInertiaOnNavigate: true,
    });

    // Anchor links smoothly scrolling with -72px offset for the sticky nav
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl as HTMLElement, { offset: -72 });
        window.history.pushState(null, '', href);
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, [enableSmoothScroll]);

  return (
    <div className="relative min-h-screen bg-[#0B0B0C] text-[#F1E6D0] font-sans selection:bg-[#D4161F] selection:text-white">
      {/* 2px crimson scroll-progress bar fixed at viewport top */}
      <ScrollProgressBar />

      {/* Accessible skip to main content */}
      <SkipLink targetId="#main-content" />

      {/* Global 5.5% Halftone / Comic Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Fixed faint (6-10% opacity) Persistent Mandala rotating with scroll velocity */}
      <PersistentMandala />

      {/* Desktop Sling Ring Custom Cursor with 8px dot, 36px dashed ring, 6 states & web strands */}
      <SlingRingCursor />

      {/* 1. Sticky Nav */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10">
        {/* 2. Hero (ink / paper split) */}
        <HeroSection />

        {/* 3. Builds from The ZeroShot (ink) */}
        <BuildsSection />

        {/* 4. Selected Work (paper) */}
        <SelectedWorkSection onSelectProject={setSelectedProject} />

        {/* 5. Services (ink) */}
        <ServicesSection />

        {/* 6. Toolbelt (paper) */}
        <ToolbeltSection />

        {/* 7. About (ink) */}
        <AboutSection />

        {/* 8. Contact + Footer (ink with web lines) */}
        <ContactSection />
      </main>

      {/* Floating Bottom-Right Mobile Hire Me CTA (appears after hero) */}
      {showFloatingHire && <HireMeButton variant="floating" />}

      {/* Case-File Slide-Over Drawer */}
      <CaseFileDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
