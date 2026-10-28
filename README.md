# Krishna Patel — Portfolio Engineering Handover Guide

Welcome to your production portfolio repository. This single-page application is built on React 19, Vite, Tailwind CSS v4, Motion, Lenis, and Three.js, following the strict **Ink & Portal** graphic novel aesthetic.

---

## 1. Quick Editing: `src/content.ts`

All text, projects, services, video links, and toolbelt chips live in a single, strictly typed data bank: `src/content.ts`.

### A. How to Swap a Featured YouTube Video
Open `src/content.ts` and locate `featuredBuilds`:
```typescript
{
  id: 'mandala',
  title: 'Doctor Strange Sling Ring CV',
  badge: 'CV PROTOTYPE',
  summary: 'Real-time gesture-controlled mystic mandala rendered in browser...',
  youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID', // <-- paste your new YouTube URL here
  tech: ['Python', 'OpenCV', 'MediaPipe', 'WebGL'],
}
```
The modal player automatically extracts the 11-character video ID and safely loads `youtube-nocookie.com/embed/<id>?autoplay=1` upon click.

### B. How to Change the "Open to Work" Text
In `src/content.ts`, edit the `openToWork` configuration:
```typescript
openToWork: {
  status: 'Open to Work',
  roles: 'AI Engineering Student · Freelancer · Creator',
  availability: 'Immediate availability for freelance contracts & full-time AI roles.',
  details: 'Open to freelance contracts, internships, research collaborations, and full-time roles.',
}
```

### C. How to Add or Modify a Selected Work Project
In `src/content.ts`, add a new object to `selectedWork`:
```typescript
{
  id: 'new-system-id',
  title: 'Autonomous Vision Pipeline',
  domain: 'COMPUTER VISION',
  description: 'High-speed object tracking engine running at 120 FPS on edge hardware.',
  tech: ['Python', 'YOLOv11', 'TensorRT', 'C++'],
  caseFile: {
    what: 'A production inference pipeline for edge robotics...',
    how: 'Engineered custom CUDA kernels and quantized weights to FP16...',
    stack: ['YOLOv11', 'TensorRT', 'C++', 'GStreamer'],
    keyDeliverables: [
      'Sub-8ms latency benchmark on Jetson Orin',
      'Zero-drift tracker across occlusion frames'
    ],
    links: [
      { label: 'Live Demo', url: 'https://your-demo-url.com' } // Never link raw GitHub per privacy rules
    ]
  }
}
```
*Note: If a project is theoretical or exploratory, set `isResearchOnly: true` and specify `researchBadge: 'RESEARCH ONLY'`.*

---

## 2. Rotating the WhatsApp Contact Number

To protect your privacy, your phone number is **never embedded in the client HTML or JavaScript bundle**. All contact clicks route through `/hire` -> serverless function `/api/hire.ts`.

### Rotating on Vercel:
1. Navigate to your project in the [Vercel Dashboard](https://vercel.com).
2. Go to **Settings** → **Environment Variables**.
3. Add or update the variable:
   - **Key**: `WHATSAPP_NUMBER`
   - **Value**: Your phone number with country code (e.g., `919876543210` with no spaces, dashes, or `+`).
   - **Environments**: Select **Production**, **Preview**, and **Development**.
4. Redeploy or trigger a build.

### Testing Locally:
Create a `.env` file (copied from `.env.example`):
```env
WHATSAPP_NUMBER="919876543210"
```
When visiting `/hire`, you will be automatically 302-redirected to `https://wa.me/919876543210?text=...`.

---

## 3. Automated Audits & Verification

The repository includes pre-configured audit scripts:

- **Type Check & Lint**:
  ```bash
  npm run lint
  ```
- **Privacy Audit** (Ensures zero phone number leakage in built assets):
  ```bash
  npm run check:privacy
  ```
- **Content Completeness** (Audits for pending TODO markers):
  ```bash
  npm run check:content
  ```
- **Production Build**:
  ```bash
  npm run build
  ```

---

## 4. Architecture & Key Files

- `/src/content.ts` — Single source of truth for portfolio copy, projects, and links.
- `/src/components/interactive/SlingRingCursor.tsx` — Desktop custom reticle cursor with 6 interactive states and tone detection.
- `/src/components/interactive/PersistentMandala.tsx` — Fixed background sacred geometry rotating with scroll inertia.
- `/src/components/interactive/TiltCard.tsx` — 3D cursor tilt with interactive glare highlights.
- `/src/components/interactive/MagneticButton.tsx` — Spring-pull magnetic button interaction.
- `/api/hire.ts` — Zero-leak WhatsApp 302 redirection serverless handler.
- `/public/robots.txt` & `/public/sitemap.xml` — SEO indexing rules (disallows `/hire`).
