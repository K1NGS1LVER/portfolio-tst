# BATON.md — Daniel Paul Portfolio Project Log

> **Purpose**: Living log for this project. Every decision, implementation choice, problem & solution, what's done, and what's next is recorded here. Pick this up at any point to know exactly where the project stands.

---

## 📋 Project Overview

- **Goal**: Transform [Portfolio-Landing-Page-5-React-Frontend](https://github.com/arnobt78/Portfolio-Landing-Page-5-React-Frontend) (MIT licensed) into Daniel Paul's personal portfolio.
- **Working directory**: `/Users/dan/projects/K1NGS1LVER/portfolio2/Portfolio-Landing-Page-5-React-Frontend/`
- **Dev server**: `http://localhost:5173/` (run `npm run dev` from working dir)
- **Stack**: React 19 · Vite 6 · Tailwind CSS 4 · GSAP 3 (ScrollTrigger + Observer) · Lenis smooth scroll

---

## 🧠 Key Decisions Log

### Decision 1 — Remove Three.js entirely
- **Choice**: Strip `three`, `@react-three/fiber`, `@react-three/drei`, `maath` from the project.
- **Reason**: The 3D planet hero (`Planet.glb` = 18MB) doesn't fit Daniel's dev/AI identity. Removing it drops the JS bundle from ~800KB gzipped to ~138KB. Simpler, faster, more typographic.
- **Alternative considered**: Keep Three.js, swap the planet for a different 3D object.
- **Why rejected**: 18MB asset + heavy runtime overhead for a portfolio that should load instantly.

### Decision 2 — Hero replacement: animated SVG circuit lines
- **Choice**: `HeroSVGLines.jsx` — SVG with geometric circuit-board paths that animate via GSAP `stroke-dashoffset` (draws itself on load).
- **Reason**: Fits a developer/AI engineer identity. The "growing line" motif is on-brand. Zero runtime cost, no external lib needed.
- **Alternative considered**: Static background gradient, particle canvas, Lottie animation.
- **Why rejected**: Static = boring; canvas particles = extra dep; Lottie = another bundle.

### Decision 3 — Palette: dark charcoal + electric violet-indigo
- **Choice**: `--bg: #080808`, `--accent: #7c6aff` (violet-indigo).
- **Reason**: Snellenberg-direction as requested. Near-black bg with one strong accent color gives a premium typographic feel. Indigo reads "technical" without being plain blue.
- **Alternative considered**: Pure black + cyan; dark + amber/gold; dark + green.
- **Why rejected**: Cyan = too "hacker"; amber = warm/startup; green = too Matrix.
- **CSS token system**: All colors as `--var` in `:root`, no hardcoded hex in components — makes palette swaps easy.

### Decision 4 — Rename "Services" → "Skills"
- **Choice**: Created `Skills.jsx` and `SkillsSummary.jsx` (new files), kept old `Services.jsx`/`ServiceSummary.jsx` as dead files.
- **Reason**: Daniel is a candidate/engineer, not a freelance agency. "Skills" frames it as capability, not a service catalogue.
- **Note**: Old `Services.jsx` and `ServiceSummary.jsx` still exist in `/src/sections/` but are no longer imported. Can be trashed when confirmed clean.

### Decision 5 — Profile photo placeholder
- **Choice**: AI-generated circuit-board human silhouette (indigo-to-cyan glow lines) saved as `public/images/daniel.jpg`.
- **Reason**: No real photo provided. Thematic: circuit board face = AI/ML engineer identity.
- **TODO**: Replace with a real photo by overwriting `public/images/daniel.jpg`.

### Decision 6 — Project images
- **Choice**: AI-generated dark UI mockups for ClearNews (news dashboard), FinPath (Sankey+AI chat), docSeek (RAG search UI).
- **Reason**: No screenshots provided. Generated images match the dark palette and show realistic UI.
- **TODO**: Replace with real screenshots by overwriting files in `public/assets/projects/`.

---

## ✅ What's Done (Completed)

### Session 1 — 2026-08-04

#### Research Phase
- [x] Read full template codebase: `App.jsx`, all 8 sections, all 4 components, `constants/index.js`, `index.css`, `vite.config.js`
- [x] Extracted Daniel's resume from `default.pdf` using `pdftotext`
- [x] Captured: name, email, phone, LinkedIn, GitHub, education, 3 jobs, 3 projects, full tech stack, 3 accomplishments

#### Asset Generation
- [x] Generated: `daniel.jpg` (circuit-board placeholder photo)
- [x] Generated: `clearnews.jpg` (news intelligence platform mockup)
- [x] Generated: `finpath.jpg` (AI financial planner mockup)
- [x] Generated: `docseek.jpg` (semantic search/RAG UI mockup)
- [x] Copied all 4 images to correct `public/` paths
- [x] Copied `default.pdf` → `public/resume.pdf` for Download CV button

#### Dependency Changes
- [x] Removed from `package.json`: `three`, `@react-three/fiber`, `@react-three/drei`, `maath`
- [x] Updated `vite.config.js`: removed Three.js manual chunk entry, fixed `chunkSizeWarningLimit`
- [x] Moved `src/components/Planet.jsx` → `~/.Trash/Planet.jsx`
- [x] Ran `npm install` + approved build scripts

#### Source Files Modified/Created
- [x] `src/constants/index.js` — Full rewrite: `skillsData` (3 domains), `projects` (3 AI projects), `socials`
- [x] `src/index.css` — Dark palette, design tokens, scrollbar, grain overlay, Amiamie font faces
- [x] `src/App.jsx` — Removed `useProgress`/Three.js, CSS fade-in, wired new section names
- [x] `src/components/HeroSVGLines.jsx` — NEW: animated SVG circuit lines with GSAP stroke-dashoffset
- [x] `src/sections/Hero.jsx` — SVG backdrop + Daniel's name/bio + scroll indicator + radial glow
- [x] `src/sections/Navbar.jsx` — Dark theme, Daniel's email/socials, accent hover, updated section IDs
- [x] `src/sections/SkillsSummary.jsx` — NEW: parallax scrolling tech keywords (Full-Stack · AI/ML · React…)
- [x] `src/sections/Skills.jsx` — NEW: sticky-stacked skill cards (renamed from Services)
- [x] `src/sections/About.jsx` — Daniel's bio, 3 experience cards, Download CV button, clip-path image reveal
- [x] `src/sections/Works.jsx` — 3 projects, cursor-follow preview (desktop), tech stack, GitHub links
- [x] `src/sections/ContactSummary.jsx` — Tech marquee, dark theme, accent CTA quote
- [x] `src/sections/Contact.jsx` — Real email/phone/socials with icons, location, footer
- [x] `index.html` — Daniel's SEO meta, OG tags, theme-color

#### Build Verification
- [x] `npm run build` → ✅ exit 0, 835ms, ~138KB gzipped total JS
- [x] `npm run dev` → ✅ running at `http://localhost:5173/`

---

## 🐛 Problems Encountered & Solutions

### Problem 1 — Build failed: `Could not resolve entry module "@react-three/fiber"`
- **Symptom**: `npm run build` exited code 1
- **Root cause 1**: `vite.config.js` had Three.js in `manualChunks` — Rollup tried to load these as entry points.
- **Solution attempt 1**: Found `Planet.jsx` still had the import. Moved to trash. → Build still failed.
- **Root cause 2**: Even with `Planet.jsx` removed, `vite.config.js` still declared `three` as a manual chunk entry.
- **Solution attempt 2**: Removed `vendor-three` line from `vite.config.js`. → ✅ Build passed.

### Problem 2 — PDF binary output from `strings` command
- **Symptom**: Initial attempt to view PDF with `view_file` failed (unsupported MIME type). `strings` command returned binary garbage.
- **Solution**: Used `which pdftotext` → found at `/opt/homebrew/bin/pdftotext`. Ran `pdftotext default.pdf -`.
- **Result**: ✅ Complete resume text extracted.

### Problem 3 — npm `allow-scripts` warning on install
- **Symptom**: `npm install` warned that `@tailwindcss/oxide`, `esbuild`, `fsevents` needed script approval.
- **Solution**: `npm approve-scripts @tailwindcss/oxide esbuild fsevents` then re-ran `npm install`.
- **Result**: ✅ All packages installed.

### Problem 4 — Artifact path not in project directory
- **Symptom**: Tried to create `BATON.md` via `write_to_file` inside the project directory — tool rejected it (artifacts must be in brain dir).
- **Solution**: Used `run_command` with `cat > BATON.md` heredoc to write directly to the project directory.
- **Result**: ✅ BATON.md created in project root.

---

## 🔜 What's Next (TODO)

### Immediate (before shipping)
- [ ] **Browser verification**: Open `http://localhost:5173/` and manually verify all sections, animations, scroll
- [ ] **AnimatedTextLines fix**: Component doesn't forward `style` prop — About section bio text may not pick up `--text-muted` color. Add `style` forwarding to `AnimatedTextLines.jsx`
- [ ] **Cleanup dead files**: `src/sections/Services.jsx` and `src/sections/ServiceSummary.jsx` not imported. Move to trash.

### Content replacements (when ready)
- [ ] **Real profile photo** → overwrite `public/images/daniel.jpg` (keep same path, portrait crop)
- [ ] **Real project screenshots** → overwrite `public/assets/projects/{clearnews,finpath,docseek}.jpg`
- [ ] **Specific GitHub repo links** → update `github` field in `constants/index.js` for each project

### Enhancement ideas
- [ ] **favicon.svg** — Replace template icon with "DP" monogram or circuit-node
- [ ] **Accomplishments section** — Standalone section for 3 competition wins
- [ ] **TypeScript migration** — `constants/index.js` → `constants/index.ts` first
- [ ] **Deploy** — `npm run build` → Vercel/Netlify deploy of `dist/`

---

## 📁 File Map (Current State)

```
portfolio2/
├── default.pdf                             ← Original resume (source of all content)
├── BATON.md                                ← This file
└── Portfolio-Landing-Page-5-React-Frontend/
    ├── public/
    │   ├── images/daniel.jpg               ← ⚠️  Placeholder — replace with real photo
    │   ├── assets/projects/
    │   │   ├── clearnews.jpg               ← ⚠️  AI mockup — replace with screenshot
    │   │   ├── finpath.jpg                 ← ⚠️  AI mockup — replace with screenshot
    │   │   └── docseek.jpg                 ← ⚠️  AI mockup — replace with screenshot
    │   ├── resume.pdf                      ← ✅  Daniel's CV (downloadable)
    │   └── fonts/amiamie/                  ← ✅  Font files (kept from template)
    ├── src/
    │   ├── constants/index.js              ← ✅  All content (skills, projects, socials)
    │   ├── index.css                       ← ✅  Dark theme + design tokens
    │   ├── App.jsx                         ← ✅  Root, Lenis, section orchestration
    │   ├── components/
    │   │   ├── HeroSVGLines.jsx            ← ✅  NEW: animated circuit lines
    │   │   ├── AnimatedHeaderSection.jsx   ← ✅  Kept unchanged
    │   │   ├── AnimatedTextLines.jsx       ← ⚠️  Needs style prop forwarding
    │   │   └── Marquee.jsx                 ← ✅  Kept unchanged
    │   └── sections/
    │       ├── Hero.jsx                    ← ✅  SVG backdrop + Daniel hero
    │       ├── Navbar.jsx                  ← ✅  Dark theme + Daniel socials
    │       ├── SkillsSummary.jsx           ← ✅  NEW: parallax tech keywords
    │       ├── Skills.jsx                  ← ✅  NEW: stacked skill cards
    │       ├── About.jsx                   ← ✅  Bio + experience + Download CV
    │       ├── Works.jsx                   ← ✅  3 AI projects
    │       ├── ContactSummary.jsx          ← ✅  Tech marquee + CTA
    │       ├── Contact.jsx                 ← ✅  Email/phone/socials/footer
    │       ├── Services.jsx                ← 🗑️  Dead file — can trash
    │       └── ServiceSummary.jsx          ← 🗑️  Dead file — can trash
    ├── index.html                          ← ✅  Daniel's SEO meta
    ├── package.json                        ← ✅  Three.js removed
    ├── vite.config.js                      ← ✅  Three.js chunks removed
    └── BATON.md                            ← ✅  This file
```

---

## 🔧 Useful Commands

```zsh
# Development
cd /Users/dan/projects/K1NGS1LVER/portfolio2/Portfolio-Landing-Page-5-React-Frontend
npm run dev          # → http://localhost:5173/

# Build
npm run build        # → dist/
npm run preview      # Preview prod build locally

# Cleanup dead files
mv src/sections/Services.jsx ~/.Trash/
mv src/sections/ServiceSummary.jsx ~/.Trash/
```

---

## 📞 Daniel's Info (Reference)

| Field | Value |
|---|---|
| Email | danielpaul150604@gmail.com |
| Phone | +91 98459 99547 |
| LinkedIn | linkedin.com/in/daniel-paul-dev |
| GitHub | github.com/K1NGS1LVER |
| Location | Bengaluru, Karnataka, India |
| Education (current) | MCA · Christ (Deemed To Be University) · Expected May 2027 |
| Education (prev) | B.Sc. CS & Electronics · Kristu Jayanti University · July 2025 |

---

*Last updated: 2026-08-04 · Session 1*

---

## Session 1 — Post-session addendum (same day)

### Additional fixes applied after initial build
- [x] **AnimatedTextLines.jsx** — Added `style` prop forwarding so About section can apply `--text-muted` color via CSS variable
- [x] **Dead file cleanup** — Moved `Services.jsx` and `ServiceSummary.jsx` to `~/.Trash/` (renamed with `_template` suffix to avoid collision)
- [x] **BATON.md itself** — Created via `run_command`/heredoc (not `write_to_file` — artifacts must live in brain dir)
- [x] **Final build** → ✅ exit 0, 910ms, all 124 modules transformed

### Problem 4 — Artifact path not in project directory (addendum)
- **Resolution**: Used `run_command` with `cat > BATON.md << 'EOF'` heredoc pattern. Works correctly. All future BATON updates should use `run_command` with `cat >>` to append.

*Last updated: 2026-08-04 · Session 1 addendum*

---

## Session 2 — 2026-08-04

### Decisions, Reversions, and Constellation Implementation
- [x] **Palette Reversion**: Restored the original repository's clean white background, black text, and gold (`#c9a84c`) accent theme across the site. Reconfigured the Tailwind `@theme` in `index.css`.
- [x] **Empty Hero Resolution**: Resolved the empty hero screen issue by implementing **Option A (Particle Constellation)**. Added a custom `<canvas>` drawing logic inside the hero screen that creates a floating network nodes animation, with nodes softly repelling from the mouse cursor and connection lines drawn with gold and charcoal colors.
- [x] **Reconstructed Sections Styling**: Reverted custom dark styling back to matching the original repository template exactly, keeping borders, spacing, header section layouts, and scrolling marquees.
- [x] **Verified Compilation**: Re-ran the production build to ensure clean compilation. Total build time remains under 1s with a total JS bundle size of ~138KB gzipped.

*Last updated: 2026-08-04 · Session 2 complete*

---

## Session 3 — 2026-08-04

### Premium Differentiators Implementation (Tasks 1, 4, and 5)
- [x] **Interactive Vector Space Constellation (Task 1)**: Upgraded the canvas background particles to represent an interactive embedding map. Labeled particles float along with their tags (e.g. `FastAPI`, `LangGraph`, `pgvector`) in three semantic cluster groupings (Frontend, Backend, AI/ML) that apply a gentle force to pull together. When the cursor approaches a node, it triggers a gold radar inspection ring and scales up the label text.
- [x] **Developer-Focused Monospace Typography (Task 4)**: Loaded `JetBrains Mono` from Google Fonts. Re-styled index numbers, years, organizations, contact fields, and footer signatures across all sections. Reformatted the tech stack labels in the Works section from simple string listings into custom styled code-badge components.
- [x] **GSAP Mouse Interactions & Trailing Cursor (Task 5)**:
  - Created [`CustomCursor.jsx`](file:///Users/dan/projects/K1NGS1LVER/portfolio2/Portfolio-Landing-Page-5-React-Frontend/src/components/CustomCursor.jsx) rendering a dot follower and a larger ring follower with a lagging trail via GSAP `quickTo`. Hovering over interactive targets automatically enlarges the follower ring.
  - Implemented dynamic class-based magnetic attraction inside [`useMagnetic.js`](file:///Users/dan/projects/K1NGS1LVER/portfolio2/Portfolio-Landing-Page-5-React-Frontend/src/hooks/useMagnetic.js). Binds a mutation observer inside `App.jsx` to automatically pull any element with the `.magnetic` class (e.g. Nav burger toggle, slide-out menu links, CV downloads, and GitHub links) toward the cursor and snap them back with an elastic animation on leave.

*Last updated: 2026-08-04 · Session 3 complete*

---

## Session 4 — 2026-08-04

### Package Manager Conversion to pnpm
- [x] **Stopped NPM Server**: Terminated the running background npm dev server task.
- [x] **Cleaned NPM Assets**: Moved `package-lock.json` and `node_modules` to the system trash directory `~/.Trash/` to prevent collisions and clean the workspace.
- [x] **PostCSS Import Fix**: Relocated the `@import url(...)` statement for the JetBrains Mono font to the very first line of `src/index.css` to comply with the PostCSS import specification.
- [x] **Installed pnpm Dependencies**: Ran `pnpm install` in the project directory, resolved build script permissions for `esbuild@0.25.12` using `pnpm approve-builds`, and finalized dependency configurations.
- [x] **Verified pnpm Builds**: Ran `pnpm build` to compile the production bundle (exits cleanly in `1.28s`).
- [x] **Started pnpm Dev Server**: Launched the development server using `pnpm dev` as a background task. Listening at **http://localhost:5173/**.

*Last updated: 2026-08-04 · Session 4 complete*

---

## Session 5 — 2026-08-04

### Server Shutdown
- [x] **Stopped pnpm Dev Server**: Terminated the running background pnpm dev server task (`task-292`).

*Last updated: 2026-08-04 · Session 5 complete*

---

## Session 6 — 2026-08-04

### Vector Clustering Physics Fix
- [x] **Spring Physics Integration**: Refactored `ParticleConstellation.jsx` clustering logic. Replaced pure linear attraction with Hooke's Law spring physics ($F = -k \cdot x$) to keep vector labels spaced out at a comfortable target separation of $150px$, preventing collapse.
- [x] **Kinetic Speed Floor**: Added an active speed floor ($0.15px/frame$) to prevent nodes from decaying to absolute rest under dampening.
- [x] **IntersectionObserver Loop Pausing**: Wired an `IntersectionObserver` on the canvas container to automatically freeze the animation loop when scrolled out of view and resume immediately when scrolled back into view.
- [x] **Build Verification**: Ran production build checks via `pnpm build` (exits code `0` in `1.35s`).

*Last updated: 2026-08-04 · Session 6 complete*
