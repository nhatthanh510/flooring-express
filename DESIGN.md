---
name: Timber & Slate
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4d4540'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e756f'
  outline-variant: '#cfc4bd'
  surface-tint: '#635d5a'
  primary: '#181512'
  on-primary: '#ffffff'
  primary-container: '#2d2926'
  on-primary-container: '#96908b'
  inverse-primary: '#cdc5c0'
  secondary: '#735a3a'
  on-secondary: '#ffffff'
  secondary-container: '#fddab2'
  on-secondary-container: '#785e3e'
  tertiary: '#161612'
  on-tertiary: '#ffffff'
  tertiary-container: '#2b2a26'
  on-tertiary-container: '#94918b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9e1dc'
  primary-fixed-dim: '#cdc5c0'
  on-primary-fixed: '#1e1b18'
  on-primary-fixed-variant: '#4b4642'
  secondary-fixed: '#ffddb6'
  secondary-fixed-dim: '#e2c19b'
  on-secondary-fixed: '#291801'
  on-secondary-fixed-variant: '#594325'
  tertiary-fixed: '#e6e2db'
  tertiary-fixed-dim: '#cac6bf'
  on-tertiary-fixed: '#1c1c17'
  on-tertiary-fixed-variant: '#484742'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 80px
---

## Brand & Style

The design system is built on a foundation of reliability and craftsmanship. It targets homeowners and commercial developers seeking a premium, stress-free flooring installation experience. The aesthetic is a refined **Corporate/Modern** style with **Minimalist** tendencies, emphasizing material quality through high-resolution imagery and generous whitespace.

The emotional response should be one of "effortless stability"—the user should feel they are in the hands of experts who value precision and contemporary design. This is achieved through a structured grid, subdued organic tones, and an interface that prioritizes clarity over ornamentation.

## Colors

The palette is derived from high-end interior materials to establish immediate industry relevance.

- **Primary (Charcoal):** Used for primary text and structural elements to provide a grounded, authoritative feel.
- **Secondary (Oak):** A warm, metallic-tinted wood tone used for key actions (CTAs) and highlighting craftsmanship.
- **Tertiary (Warm Grey):** Used for subtle backgrounds and divider lines to soften the interface.
- **Neutral (Crisp White/Off-White):** Provides the expansive whitespace necessary for a "clean" installation feel.
- **Success/Warning:** Use muted, natural versions of green and amber to maintain the sophisticated atmosphere.

## Typography

This design system utilizes **Montserrat** for headings to convey strength and modernity, utilizing its geometric structure to mirror architectural precision. **Inter** is used for all body and UI text to ensure maximum legibility at small sizes, particularly for technical specifications and quotes.

Large display headings should use tighter letter-spacing to appear more "designed" and editorial. Body text should maintain standard tracking to ensure comfortable reading during long-form project descriptions.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a strictly enforced 8px base unit.

- **Desktop:** 12-column grid with a maximum container width of 1280px.
- **Tablet:** 8-column grid with 24px margins.
- **Mobile:** 4-column grid with 16px margins.

Spacing between major sections should be generous (80px+) to reflect the "open floor plan" feel of the product. Elements within cards should use a hierarchy of 8px (tight), 16px (standard), and 24px (relaxed) increments.

## Elevation & Depth

Visual hierarchy is managed through **Tonal Layers** and **Ambient Shadows**.

Surfaces should primarily be flat, using subtle changes in background color (e.g., White to #F9F9F9) to distinguish sections. When depth is required—such as for floating navigation or product cards—use a very soft, diffused shadow: `0px 4px 20px rgba(0, 0, 0, 0.05)`.

Avoid heavy dropshadows or complex gradients. The goal is to make elements appear as though they are resting naturally on a flat surface, mirroring the physical nature of flooring.

## Shapes

The design system uses a **Rounded** (0.5rem) language. This softens the "industrial" nature of construction and makes the brand feel more approachable and domestic.

- **Standard Buttons & Inputs:** 8px (0.5rem) radius.
- **Product Cards:** 16px (1rem) radius for a friendlier, modern furniture-store aesthetic.
- **Selection Chips:** Full pill-shape to contrast against the more structured grid elements.

## Components

### Buttons

- **Primary:** Solid Charcoal (#2D2926) with white text. High-contrast, no shadow.
- **Secondary:** Solid Oak (#A68966) for secondary conversion points (e.g., "Request Sample").
- **Tertiary:** Ghost style with a thin Charcoal border for low-priority actions.

### Cards

Cards should have a subtle 1px border (#E5E1DA) and a soft hover state that increases the shadow diffusion. This is the primary vehicle for displaying flooring types (Timber, Laminate, Hybrid).

### Input Fields

Inputs use a 1px border in Warm Grey. On focus, the border shifts to Oak (#A68966) with a subtle 2px outer glow in the same color at 10% opacity.

### Lists & Tables

Used for technical specifications (Janka rating, thickness, plank size). Use alternating row colors (Zebra striping) using Tertiary (#E5E1DA) at 20% opacity for maximum scanability.

### Specialized Components

- **The "Plank" Toggle:** A custom radio button group that uses rectangular shapes resembling floor planks to select finishes or styles.
- **Visualizer Overlay:** A clean, glassmorphic container for the AR/Virtual room-viewing feature.
