---
name: TownLink Design System
colors:
  surface: '#f3fcef'
  surface-dim: '#d4dcd1'
  surface-bright: '#f3fcef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef6ea'
  surface-container: '#e8f0e4'
  surface-container-high: '#e2ebde'
  surface-container-highest: '#dce5d9'
  on-surface: '#161d16'
  on-surface-variant: '#3d4a3d'
  inverse-surface: '#2b322a'
  inverse-on-surface: '#ebf3e7'
  outline: '#6d7b6c'
  outline-variant: '#bccbb9'
  surface-tint: '#006d2f'
  primary: '#006d2f'
  on-primary: '#ffffff'
  primary-container: '#30cb65'
  on-primary-container: '#005020'
  inverse-primary: '#4ce178'
  secondary: '#006b5f'
  on-secondary: '#ffffff'
  secondary-container: '#6cf9e4'
  on-secondary-container: '#007165'
  tertiary: '#005ac2'
  on-tertiary: '#ffffff'
  tertiary-container: '#8cb1ff'
  on-tertiary-container: '#004190'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6cfe91'
  primary-fixed-dim: '#4ce178'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005322'
  secondary-fixed: '#6cf9e4'
  secondary-fixed-dim: '#49dcc8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f3fcef'
  on-background: '#161d16'
  surface-variant: '#dce5d9'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  caption:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 24px
  gutter: 16px
  section-gap: 40px
  element-gap: 12px
  stack-sm: 4px
  stack-md: 8px
  stack-lg: 16px
---

## Brand & Style
The design system is engineered for a premium service-discovery experience tailored to the Ghanaian market. It balances vibrant, growth-oriented energy with institutional trust. The personality is professional, efficient, and welcoming—moving away from the cluttered look of traditional directories toward a sophisticated, modern aesthetic.

The visual style follows a **Corporate / Modern** approach with a heavy emphasis on **Minimalism**. It utilizes generous whitespace to reduce cognitive load when browsing service categories, while incorporating high-quality imagery and a proprietary color palette to signal premium quality. The interface feels light, airy, and trustworthy, ensuring users feel confident in the professionals they find.

## Colors
This design system uses a refreshing "Cool-Green" palette. The **Primary Vibrant Green** represents growth and action, while the **Turquoise** and **Royal Blue** offer professional accents for secondary actions and information hierarchy. 

The **Brand Dark (Deep Dark Teal)** is used for high-contrast elements and deep grounding, replacing standard blacks for a more sophisticated feel. The background is a soft **Light Blue-Gray** which creates a subtle "paper" effect, allowing pure white surfaces to pop with clarity. WhatsApp integration is highlighted using the standard brand green to maintain instant recognizability for communication.

## Typography
The typography relies exclusively on **Hanken Grotesk**, a clean, sharp, and contemporary typeface that ensures readability across all device types. 

- **Hierarchy:** Use Bold (700) and ExtraBold (800) for headlines to create a strong vertical rhythm. 
- **Readability:** Body text uses a generous 1.5x line-height to ensure ease of reading for long service descriptions.
- **Micro-copy:** Labels and captions use Medium (500) or SemiBold (600) weights at smaller sizes to maintain legibility against colored backgrounds.
- **Mobile Scaling:** Large display types scale down by ~15% on mobile devices to prevent awkward text wrapping while maintaining impact.

## Layout & Spacing
The layout uses a **Fluid Grid** model optimized for mobile-first consumption. 

- **Margins:** A consistent 24px horizontal margin is applied to all mobile screens to provide significant breathing room.
- **Rhythm:** An 8px linear scale (4, 8, 16, 24, 32, 40, 48, 64) governs all padding and margins.
- **Grid:** On mobile, a 2-column or 1-column layout is preferred for service listings to keep cards large and touch-friendly. On tablet and desktop, this expands to a 12-column grid with a maximum content width of 1200px.
- **Whitespace:** Emphasize vertical spacing between sections (40px+) to signal transitions between different service categories or promotional blocks.

## Elevation & Depth
This design system uses a combination of **Tonal Layers** and **Ambient Shadows** to create a sophisticated sense of depth.

- **Background:** The base layer is the Light Blue-Gray (#EEF6F9).
- **Surface:** Primary content sits on White (#FFFFFF) cards.
- **Shadows:** The signature shadow is used exclusively for interactive cards: `0 4px 24px rgba(0, 64, 79, 0.06)`. The use of the Brand Dark color within the shadow (instead of pure black) creates a more natural, "premium" depth.
- **Interactivity:** On press/active states, the shadow should slightly compress or the element should scale (98%) to provide tactile feedback without looking "heavy."

## Shapes
The shape language is "Hyper-Rounded," creating a friendly and accessible atmosphere. 

- **Standard Elements:** Buttons and interactive controls use a 12px radius.
- **Large Containers:** Content cards and modals utilize a soft 32px radius to feel distinct and modern.
- **Inputs:** Form fields use a slightly tighter 10px radius to balance precision with the overall rounded aesthetic.
- **CTAs:** High-impact call-to-actions (like "Book Now") use a 40px "Pill" radius to draw the eye and encourage clicks.

## Components
### Buttons
- **Primary:** #30CB65 background with white text. 48px min height. 12px radius.
- **Secondary:** Transparent with #30CBB8 border and text.
- **CTA/Special:** 40px pill radius. Use for main conversion points.

### Cards
- **Service Card:** White background, 32px radius, signature Teal-tinted shadow. 16px internal padding.
- **Category Card:** Soft background (#EEF6F9) with centered icons and Title-md text.

### Form Inputs
- **Text Fields:** 10px radius, 1px border (#BCC4C6). On focus, border changes to Primary Green with a soft 2px outer glow.
- **Checkboxes/Radios:** Primary Green (#30CB65) for active states.

### Chips & Badges
- **Status Badges:** Small 4px radius or pill shape. Low-opacity version of the status color (e.g., Success Green at 10% opacity) with high-saturation text.

### Navigation
- **Bottom Bar:** White surface with a very subtle top border. Use Primary Green for the active state icon and Deep Teal for inactive states.