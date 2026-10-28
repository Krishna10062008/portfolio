# Technical & Architectural Decisions (DECISIONS.md)

### 1. Framework & Dependencies
- **React 19 & Vite 8**: Built on the current React 19 + Vite scaffold with `@tailwindcss/vite` v4.
- **Lenis (`lenis`)**: Used for smooth kinetic inertia scrolling on desktop, automatically disabled if `prefers-reduced-motion` is active or on touch/mobile devices.
- **Motion (`motion/react`)**: High-performance compositor-friendly animations for reveals, slide-over case drawer, and entrance sequences.
- **Self-Hosted Typography**:
  - Anton (`@fontsource/anton`) for bold, punchy comic display titles.
  - Inter (`@fontsource/inter`) for crisp, readable body text.
  - JetBrains Mono (`@fontsource/jetbrains-mono`) for chapter indices (`02 / BUILDS`), tech stacks, and tags.

### 2. Live Three.js Mandala & Lazy-Loading Strategy
- **Layered Architecture**:
  - **Instant Poster**: The code-generated SVG `MandalaRing` renders immediately during first paint, achieving instant LCP (< 1.5s).
  - **Idle Loading**: Three.js (`three`) and the WebGL scene are lazy-loaded via `requestIdleCallback` after first paint, keeping the initial JS bundle lightweight (< 200 KB gzip).
  - **Crossfade**: Once WebGL is initialized, it smoothly crossfades from the SVG poster.
  - **Fallbacks**: When `prefers-reduced-motion` is enabled, on touch/mobile devices (`pointer: coarse`), on low-power devices, or if WebGL context creation fails, the app preserves the lightweight SVG poster with CSS rotation.
- **3D Scene Specifications**:
  - Three concentric gold ring meshes with procedural canvas-rendered rune and tick markings.
  - `THREE.AdditiveBlending` for mystical sling-ring luminescence.
  - Exactly 220 orbiting ember particles (<= 250 limit) split between rune gold (`#C9922B`) and comic action crimson (`#D4161F`).
  - Pointer movement tilts the rings up to 12 degrees (`0.209 rad`) and shifts the portrait container by up to 8px, both smoothed with exponential damping/lerp.
  - DPR capped at 1.75 (`Math.min(window.devicePixelRatio, 1.75)`).
  - Pauses execution via `IntersectionObserver` when off-screen and on `visibilitychange` when the tab is hidden. Full cleanup and disposal on unmount.

### 3. Hero & Navigation Upgrades
- **Diagonal Split**: Ink `#0B0B0C` on the left and Paper `#F1E6D0` on the right matching the comic art. Stacks vertically on mobile.
- **Sticker Portrait**: White sticker outline border contour (`p-1 bg-white border-2 border-[#0B0B0C] shadow-[8px_8px_0px_#C9922B]`) reflecting the physical comic graphic novel feel.
- **Eyebrow & H1**: Eyebrow `“AI ENGINEERING STUDENT · FREELANCER · CREATOR”`, H1 `“KRISHNA PATEL”` in Anton with crimson slash accent `/`, and subline `“I turn AI, computer vision and automation into things that feel like magic.”`.
- **Open to Work Tag**: Pill in the nav and hero with pulsing `#3DDC84` dot and accessible hover/tap tooltip (`“Freelance · Full-time · Internships · Collaborations. Open to work in any form.”`).
- **Hire Me CTA**: Label `“HIRE ME”`, SVG WhatsApp glyph, and `@krishna` in mono. Points to `/hire` with `target="_blank"` and `rel="noopener noreferrer"`. Compact version in nav, and floating bottom-right mobile button appearing past the hero.
- **Dynamic Navigation**: KP wordmark inside a rotating mystic ring, scroll-direction detection (hide on scroll down, show on scroll up), active section highlight via `IntersectionObserver`, and full-screen diagonal paper mobile menu.

### 4. Privacy Audit & Zero Phone Leakage
- **Build Guard (`npm run check:privacy`)**: Automated audit script that scans every text asset in `dist/` for the `WHATSAPP_NUMBER` environment value and any Indian phone number regex `[6-9][0-9]{9}`.
- Chained with `npm run build` (`vite build && tsx scripts/check-privacy.ts`) to immediately fail the build if any number leaks.
