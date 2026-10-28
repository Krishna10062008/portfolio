import { useMemo, useState } from 'react';
import { content } from '../../content.ts';
import { Section } from '../primitives/Section.tsx';
import { Container } from '../primitives/Container.tsx';
import { Button } from '../primitives/Button.tsx';
import { WebLines } from '../decorations/WebLines.tsx';
import { Mail, Youtube, Linkedin, ArrowUpRight, Copy, Check, ArrowUp } from 'lucide-react';
import { FadeUpItem } from '../interactive/FadeUpItem.tsx';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  // Assemble email at runtime from separated parts to dodge basic scrapers while rendering full visible text
  const emailAddress = useMemo(() => {
    const user = content.links.emailUser || 'kg6940749';
    const domain = content.links.emailDomain || 'gmail.com';
    return `${user}@${domain}`;
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailAddress);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = emailAddress;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch {
      // Silently fall through to show user confirmation
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Section
      id="contact"
      tone="ink"
      chapter="07 / CONTACT & RECRUITMENT"
      title="Initiate Contact"
      subtitle="One click to start a conversation for freelance contracts, full-time engineering roles, or research collaborations."
      diagonalTop={true}
      className="relative overflow-hidden pb-12"
    >
      <WebLines corner="bottom-right" size={240} color="#D4161F" opacity={0.7} />
      <WebLines corner="top-left" size={160} color="#D4161F" opacity={0.4} />

      <Container>
        {/* Main Action Billboard */}
        <FadeUpItem index={0} className="relative z-10 mb-16">
          <div className="bg-[#121214] border-[3px] border-[#C9922B] p-8 sm:p-12 rounded-[2px] shadow-[8px_8px_0px_#C9922B]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headline and Visible Email */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#18181B] border border-[#3DDC84]/50 rounded-[2px]">
                <span className="w-2 h-2 rounded-full bg-[#3DDC84] inline-block shadow-[0_0_8px_#3DDC84]" />
                <span className="font-mono text-xs text-[#F1E6D0]">
                  Immediate Availability · Freelance & Full-Time
                </span>
              </div>

              {/* Exact required headline: “Let’s build something that feels like magic.” */}
              <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-[#F1E6D0]">
                Let’s build something that feels like magic.
              </h3>

              <p className="text-base sm:text-lg text-[#F1E6D0]/85 font-normal max-w-xl">
                Whether you need a computer vision prototype, workflow automation, or an unforgettable web interface, let's connect.
              </p>

              {/* Action 2: Visible email with copy button, mailto link, and Copied toast */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${emailAddress}`}
                  data-cursor="link"
                  aria-label={`Send email to ${emailAddress}`}
                  className="font-mono text-base sm:text-lg font-bold text-[#C9922B] hover:text-[#e4a838] underline underline-offset-4 flex items-center gap-2"
                >
                  <Mail className="w-5 h-5 text-[#D4161F]" />
                  <span>{emailAddress}</span>
                </a>

                <div className="relative inline-flex items-center">
                  <button
                    onClick={handleCopyEmail}
                    aria-label="Copy email address to clipboard"
                    data-cursor="link"
                    className="p-2 rounded-[2px] border border-[#27272A] bg-[#18181B] text-[#F1E6D0] hover:text-white hover:border-[#C9922B] transition-colors flex items-center gap-1.5"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[#3DDC84]" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#F1E6D0]" />
                    )}
                    <span className="font-mono text-xs">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>

                  {/* "Copied" floating toast alert */}
                  {copied && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#3DDC84] text-[#0B0B0C] font-mono text-xs font-black rounded-[2px] shadow-[2px_2px_0px_#0B0B0C] animate-bounce"
                    >
                      Copied!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Actions 1 & 3 */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Action 1: Hire me @krishna via /hire */}
              <Button
                as="a"
                href={content.links.hireEndpoint}
                variant="primary"
                size="lg"
                data-cursor="hire"
                className="w-full text-center py-4 text-lg shadow-[6px_6px_0px_#0B0B0C] flex items-center justify-center gap-2"
              >
                {/* WhatsApp Glyph */}
                <svg
                  className="w-5 h-5 fill-current shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>HIRE ME {content.links.hireButtonLabel}</span>
              </Button>

              {/* Action 3: Icon links to LinkedIn and YouTube only (no GitHub) */}
              <div className="flex items-center gap-3">
                <Button
                  as="a"
                  href={content.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="md"
                  data-cursor="link"
                  aria-label="Krishna's LinkedIn Profile"
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Linkedin className="w-4 h-4 text-[#C9922B]" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>

                <Button
                  as="a"
                  href={content.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="md"
                  data-cursor="link"
                  aria-label="Krishna's YouTube Channel The ZeroShot"
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Youtube className="w-4 h-4 text-[#D4161F]" />
                  <span>YouTube</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
          </div>
        </FadeUpItem>

        {/* Footer Bar with current year via code and back-to-top link */}
        <footer className="relative z-10 pt-8 border-t-2 border-[#18181B] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#F1E6D0]/70">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm text-[#F1E6D0] tracking-wider">
              {content.identity.wordmark}
            </span>
            <span>·</span>
            <span>© {new Date().getFullYear()} {content.identity.name}</span>
            <span>·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={content.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="hover:text-[#C9922B] transition-colors"
            >
              The ZeroShot
            </a>
            <span>·</span>
            <a
              href={content.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="hover:text-[#C9922B] transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            {/* Back to top link */}
            <button
              onClick={scrollToTop}
              data-cursor="link"
              className="inline-flex items-center gap-1 text-[#D4161F] hover:text-[#f87171] font-bold hover:underline"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>
      </Container>
    </Section>
  );
}
