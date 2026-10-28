import { useState, useEffect, useRef } from 'react';
import { content } from '../content.ts';
import { HireMeButton } from './HireMeButton.tsx';
import { OpenToWorkPill } from './OpenToWorkPill.tsx';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Hide on scroll down, show on scroll up using ref transforms (zero React re-renders)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isVisible = true;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const header = headerRef.current;
      if (!header) return;

      if (currentScrollY <= 80) {
        if (!isVisible) {
          isVisible = true;
          header.style.transform = 'translate3d(0, 0, 0)';
        }
      } else if (currentScrollY > lastScrollY + 8) {
        // Scrolling down
        if (isVisible) {
          isVisible = false;
          header.style.transform = 'translate3d(0, -100%, 0)';
        }
      } else if (currentScrollY < lastScrollY - 8) {
        // Scrolling up
        if (!isVisible) {
          isVisible = true;
          header.style.transform = 'translate3d(0, 0, 0)';
        }
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Active section highlight via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'builds', 'work', 'services', 'toolbelt', 'about', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-30% 0px -50% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'builds', href: '#builds', label: 'Builds' },
    { id: 'work', href: '#work', label: 'Work' },
    { id: 'services', href: '#services', label: 'Services' },
    { id: 'toolbelt', href: '#toolbelt', label: 'Toolbelt' },
    { id: 'about', href: '#about', label: 'About' },
    { id: 'contact', href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 inset-x-0 z-50 transition-transform duration-300 ease-in-out border-b-2 bg-[#0B0B0C] border-[#18181B] py-3.5 will-change-transform shadow-[0_2px_0px_#0B0B0C]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: KP Wordmark inside small Mystic Ring */}
          <a
            href="#hero"
            data-cursor="link"
            className="flex items-center gap-3 text-white group select-none whitespace-nowrap shrink-0"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Outer decorative gold rune ring */}
              <svg
                viewBox="0 0 44 44"
                className="absolute inset-0 w-full h-full text-[#C9922B] animate-[spin_30s_linear_infinite] motion-reduce:animate-none"
                fill="none"
              >
                <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="22" cy="22" r="17" stroke="currentColor" strokeWidth="1" />
                <rect x="9" y="9" width="26" height="26" stroke="currentColor" strokeWidth="0.75" transform="rotate(45 22 22)" opacity="0.6" />
              </svg>

              {/* Center KP Box */}
              <div className="relative z-10 w-7 h-7 rounded-[2px] bg-[#D4161F] text-white flex items-center justify-center font-display text-sm border border-[#0B0B0C] shadow-[2px_2px_0px_#C9922B] group-hover:scale-105 transition-transform">
                {content.identity.wordmark}
              </div>
            </div>

            <span className="font-display tracking-wider text-xl text-[#F1E6D0] hidden lg:inline-block">
              {content.identity.name.toUpperCase()}
            </span>
          </a>

          {/* Zone 2: Navigation Links (Desktop) with Active Section Highlight */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs uppercase tracking-wider font-semibold"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  data-cursor="link"
                  className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                    isActive ? 'text-[#C9922B] font-bold' : 'text-[#F1E6D0]/80 hover:text-[#C9922B]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#C9922B] shadow-[0_0_8px_#C9922B]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Open to Work Pill + Compact Hire Me CTA */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Open to Work Tag */}
            <div className="hidden sm:block">
              <OpenToWorkPill size="sm" />
            </div>

            {/* Compact Hire Me Button */}
            <HireMeButton variant="compact" />

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              data-cursor="link"
              className="md:hidden p-2 rounded-[2px] border border-[#27272A] bg-[#121214] text-[#F1E6D0] hover:text-[#C9922B] active:scale-95 transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Paper Mobile Menu sliding in diagonally */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-[100] md:hidden bg-[#F1E6D0] text-[#0B0B0C] flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in slide-in-from-top-full duration-300"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 98%)',
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b-2 border-[#0B0B0C]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[2px] bg-[#D4161F] text-white flex items-center justify-center font-display text-lg border-2 border-[#0B0B0C] shadow-[3px_3px_0px_#0B0B0C]">
                {content.identity.wordmark}
              </div>
              <span className="font-display text-2xl uppercase tracking-tight text-[#0B0B0C]">
                {content.identity.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 rounded-[2px] border-2 border-[#0B0B0C] bg-[#F1E6D0] hover:bg-[#D4161F] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links in Paper Style */}
          <div className="py-8 space-y-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between font-display text-3xl uppercase tracking-wide py-2 border-b-2 border-[#0B0B0C]/15 hover:text-[#D4161F] transition-colors"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs font-bold text-[#D4161F]">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </div>

          {/* Bottom Area: Open to Work & Primary Action */}
          <div className="pt-6 border-t-2 border-[#0B0B0C] space-y-4">
            <div>
              <OpenToWorkPill size="md" />
            </div>
            <HireMeButton variant="primary" className="w-full text-center" />
          </div>
        </div>
      )}
    </>
  );
}
