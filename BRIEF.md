# Project Brief: Krishna Patel Portfolio

## Goal
A cinematic but simple single-page portfolio. A visitor should remember Krishna in 5 seconds, understand what he does in 15, and hire him in one click. Audiences: freelance clients and AI/automation recruiters.

## Theme: Ink & Portal
Extracted from the comic portrait:
- Black comic ink (`#0B0B0C`)
- Crimson spider-web lines (`#D4161F`)
- Deep red (`#5A0B0F`)
- Golden mystic mandala (`#C9922B`)
- Cream paper split by a diagonal (`#F1E6D0`)
- Live green (`#3DDC84`) reserved exclusively for the "Open to Work" dot

## Typography (Self-Hosted)
- Display: Anton
- Body: Inter
- Small labels / Code / Chapter tags: JetBrains Mono

## Reusable Decorative Motifs (Only 3 permitted + 1 grain overlay)
1. Diagonal panel cuts between sections alternating ink and paper
2. Crimson web lines in corners (`WebLines`)
3. Gold mandala ring (`MandalaRing`)
4. 5–6% SVG noise / halftone grain overlay

## Comic Details & Styling
- Hard offset shadows: `6px 6px 0px #0B0B0C` (or gold on dark)
- 2px corner radius (`rounded-[2px]`)
- 3px solid outlines on cards
- Tiny chapter labels: `01 / HERO`, `02 / BUILDS`, `03 / SELECTED WORK`, etc.
- Tone: Confident, playful, short sentences. No stock imagery, no glassmorphism, no decorative gradients.

## Page Structure
1. Nav (sticky): KP wordmark, section links, Open to Work indicator, Hire me button (`@krishna`).
2. Hero (ink/paper split): portrait with live interactive mandala ring; name, role, and CTAs on paper side.
3. Builds from The ZeroShot (ink): 3 featured YouTube videos (Doctor Strange Mandala, Thanos Snap, Home OTT).
4. Selected Work (paper): 5 project cards with case-file slide-over drawer (AI Radar System, CCTV Threat Detection, JARVIS Smartwatch [RESEARCH ONLY badge], Enterprise Web Platforms, AI Teaching Bots).
5. Services (ink): 6 freelance services.
6. Toolbelt (paper): Core stack chips + AI workflow text chips ("AI-assisted, human-verified").
7. About (ink): Farmer's son background, builder journey.
8. Contact + Footer (ink with web lines): Hire me, visible email (`kg6940749@gmail.com`), socials (YouTube, LinkedIn).

## Hard Rules & Privacy
- Zero leakage of WhatsApp phone number in client bundle/HTML/meta.
- `/hire` endpoint returns a 302 redirect to `https://wa.me/<WHATSAPP_NUMBER>?text=...` using server environment variable.
- Interactive elements carry `data-cursor` attributes (`link`, `play`, `view`, `hire`, `drag`).
- Sections carry `data-tone` attributes (`ink` or `paper`).
- Strict truthfulness: exact content bank only; missing items logged as `TODO`.
- Accessibility: WCAG AA, visible gold focus rings (`focus-visible`), reduced-motion support.
