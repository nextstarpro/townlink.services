# TownLink Design System & Component Architecture

Based strictly on your provided design assets (`hero0.png`, `how-it-works.png`, `popular-services.png`, `final-cta-and-footer.png`) and explicitly **ignoring** the old `template.html`, here is the precise implementation plan for our Design System. 

I analyzed the images and identified the core design language (which aligns with the premium *Localfinder X* aesthetic). We will build this using Tailwind v4 native CSS configuration.

## User Review Required

> [!IMPORTANT]
> **Tailwind v4 Setup:**
> We are using **Tailwind CSS v4** in this monorepo. I will configure the exact extracted tokens (Mona Sans, vibrant green, deep dark teal, large border radii) natively in CSS using the `@theme` directive inside `packages/ui/src/styles/tokens.css`.

## Proposed Changes

### 1. Design Tokens (Tailwind v4 Config)

#### [MODIFY] [packages/ui/src/styles/tokens.css](file:///d:/WorkSpace/new-project/packages/ui/src/styles/tokens.css)
We will completely discard the old `template.html` variables (gold, cream, DM Serif) and inject the highly accurate new tokens derived from the screenshots:

```css
@theme {
  /* Brand Colors */
  --color-brand-primary: #30CB65; /* Vibrant Green Accent */
  --color-brand-secondary: #30CBB8; /* Turquoise Accent */
  --color-brand-tertiary: #3B82F6; /* Royal Blue (Extracted from Logo Icon) */
  --color-brand-dark: #00404F; /* Deep Dark Teal Backgrounds */
  
  /* Background & Surface Colors */
  --color-bg-light: #EEF6F9; /* Light Blue-Gray for app background and footer */
  --color-bg-white: #FFFFFF; /* Standard Card Backgrounds */
  
  /* Text & Border Colors */
  --color-text-heavy: #001517; /* Near-Black Teal for headings */
  --color-text-primary: #002D33; /* Dark Slate for body text */
  --color-text-muted: #515F62; /* Muted Slate for secondary text */
  --color-text-caption: #767E80; /* Neutral 500 */
  --color-border-light: #D8E0E1; /* Soft dividers */
  --color-border-input: #BCC4C6; /* Outer form borders */
  
  /* Typography */
  --font-sans: "Mona Sans", system-ui, sans-serif; /* We will use Mona Sans variable font */
  
  /* Border Radius */
  --radius-btn: 12px;
  --radius-card: 32px;
  --radius-cta: 40px;
}
```

#### Color Usage Strategy
- **Brand Tertiary (Royal Blue)**: Used strictly for accessibility focus rings (`focus-visible:ring-brand-tertiary`), inline text links (`text-brand-tertiary hover:underline`), and within custom SVG illustrations to maintain visual cohesion with the logo icon.
- **Jewel Accents (Gradients)**: A subtle gradient bridging Turquoise and Blue (`bg-gradient-to-br from-brand-secondary to-brand-tertiary`). Applied sparingly to high-impact UI elements like icon badge wrappers, small "eyebrow" text (`bg-clip-text text-transparent`), and subtle interactive hover states.

---

### 2. Core UI Components (`packages/ui/src/components`)

We will build the fundamental UI atoms that reflect the exact structures found in your shots.

#### [MODIFY] [AppButton.tsx](file:///d:/WorkSpace/new-project/packages/ui/src/components/AppButton.tsx)
Refactor to support two primary layouts:
- `primary`: Background `#30CB65` (Vibrant Green), Text `#FFFFFF`, `rounded-[12px]`, generous padding (`px-7 py-4`).
- `secondary`: Transparent background, Border `1px solid #00404F` (Dark Teal), Text `#00404F`.
- Support an inverted variant for dark background sections (White button with Dark Teal text).

#### [NEW] [SectionHeading.tsx](file:///d:/WorkSpace/new-project/packages/ui/src/components/SectionHeading.tsx)
Large typography component using `Mona Sans Bold`, colored `#001517` on light backgrounds and `#FFFFFF` on dark backgrounds.

#### [NEW] [ServiceCard.tsx](file:///d:/WorkSpace/new-project/packages/ui/src/components/ServiceCard.tsx)
Matches the "Popular Services" card layout:
- Background `#FFFFFF` with heavy rounding (`rounded-[32px]`).
- `40px` padding.
- Flex header containing the H3 title (`#002D33`) and a `48px` circular arrow button on the right.
- Description paragraph in `#515F62`.
- **Hover State**: Introduces a subtle interactive "glow" using the Turquoise-to-Blue jewel accent gradient on the border or as a soft drop-shadow.

---

### 3. Application Assembly (`apps/web` & `apps/mobile`)

We will construct the main pages following the exact visual flow of the screenshots:

#### [MODIFY] [apps/web/app/(marketing)/page.tsx](file:///d:/WorkSpace/new-project/apps/web/app/(marketing)/page.tsx)
1. **Hero Section (`hero0.png`)**: Replace the old dark green/gold hero with the new bright, wide layout using the new `brand-primary` green accents.
2. **How It Works (`how-it-works.png`)**: Step-by-step layout using the new typography and visual weight rules.
3. **Popular Services (`popular-services.png`)**: A dark background block (`bg-brand-dark`) containing the grid of white `ServiceCard` components.
4. **Final CTA & Footer (`final-cta-and-footer.png`)**: 
   - A massive rounded CTA block (`bg-brand-dark`, `rounded-[40px]`) containing the magnifying glass badge (wrapped in the Turquoise-to-Blue jewel accent gradient), heading, two buttons, and the phone mockup overlay.
   - A clean multi-column footer (`bg-bg-light`) with `#D8E0E1` dividers and muted text links.

---

## Verification Plan

### Automated Tests
- Run `pnpm build` to verify the UI package compiles with the new Tailwind v4 theme schema.
- Run `pnpm lint` to ensure no unused CSS or TypeScript errors exist.

### Manual Verification
- Start `pnpm dev` and manually inspect `http://localhost:3000`.
- Place the browser window side-by-side with your 4 images to verify exact pixel-perfect adherence to colors, button padding, border radii, and typography.
