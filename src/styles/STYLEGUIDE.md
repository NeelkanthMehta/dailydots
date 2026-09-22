# Daily Dots Style Guide

Daily Dots uses a quiet, content-first visual system for quick journaling and mood tracking.

## Color

Neutral grey tokens provide the page, surface, border, and text colors. The blue primary scale is reserved for actions and selected controls.

| Role | Light token | Dark token | Use |
| --- | --- | --- | --- |
| Page background | `bg-neutral-50` | `dark:bg-neutral-950` | App background |
| Surface | `bg-white` | `dark:bg-neutral-900` | Cards and navigation |
| Control surface | `bg-white` | `dark:bg-neutral-800` | Inputs and unselected mood controls |
| Border | `border-neutral-200` / `border-neutral-300` | `dark:border-neutral-700` / `dark:border-neutral-800` | Separators and control edges |
| Primary text | `text-neutral-900` | `dark:text-neutral-100` | Headings and main content |
| Secondary text | `text-neutral-500` / `text-neutral-600` | `dark:text-neutral-300` / `dark:text-neutral-400` | Metadata and navigation |
| Action | `bg-primary-600` | `dark:bg-primary-600` | Save buttons and active navigation |

The grey palette intentionally uses Tailwind's `neutral-*` scale rather than the blue-tinted `slate-*` scale. Keep the primary blue accent for clear actions and selected states; do not introduce additional ad-hoc colors.

## Typography

- Page titles use `text-2xl font-semibold`.
- Section headings use `text-sm font-semibold`.
- Metadata and helper text use `text-sm` or `text-xs` with neutral muted text.
- Use the existing system font stack for fast, consistent rendering.

## Logo

- Use the simple four-dot `Dailydots` mark in the shared navigation, aligned at the far left of the content container.
- Keep the logo static across all routes; it should not change with the active navigation item or page.
- The logo links to `/` and uses the accessible name `Dailydots home`.
- Build the mark from the existing `primary-500` and `primary-600` tokens. Do not introduce a separate logo color or purple accent.
- Keep the mark compact at `h-6 w-6` and pair it with the `Dailydots` wordmark.

## Layout and components

- Keep the main reading column centered with `max-w-2xl` and comfortable page padding.
- Use `Card` for framed content with subtle borders and shadows.
- Use shared `Button`, `Input`, `Textarea`, and `MoodBadge` components before adding new primitives.
- Preserve visible focus outlines using the primary colour token.
- Keep controls keyboard accessible and provide labels or ARIA names for interactive elements.

## Theming

The `useTheme` hook toggles the `dark` class on the document root and persists the choice in local storage. Every new surface or text color should have a readable light and dark variant. The global page colors are defined in `src/index.css`; component-specific utilities stay next to their React components.

## Validation

Run these checks before merging visual changes:

```bash
npm run build
npm run lint
```
