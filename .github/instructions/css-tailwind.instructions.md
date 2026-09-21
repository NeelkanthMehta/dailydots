---
applyTo: '**/*.css'
---

## Tailwind CSS Instructions

---

### Overview
**Purpose:** Provide a synchronized, project‑wide guide for using Tailwind CSS in the Daily Journal with Mood Tracker app so styling is consistent, accessible, and maintainable.  
**Scope:** setup, configuration, design tokens, component styling patterns, utility usage, theming, responsive rules, performance, CI considerations, and example snippets.  
**Assumptions:** Project uses **TypeScript**, **Vite**, **React**, feature‑first file layout, and `tailwind.config.ts` as the single source of design tokens.

---

### Setup and configuration
- **Install** Tailwind via the official Vite integration and enable JIT mode by default.  
- **Content paths:** configure `content` to include all source files under `src/**/*.{ts,tsx,js,jsx,html}` to ensure unused classes are purged in production.  
- **Core plugins:** enable `@tailwindcss/forms`, `@tailwindcss/typography`, and `@tailwindcss/aspect-ratio` as needed.  
- **Config file:** keep all tokens and variants in `tailwind.config.ts`. Export a small helper file `src/shared/styles/tokens.ts` only if runtime access to tokens is required.  
- **Important flags:** avoid global `!important` usage; prefer utility precedence and component classes for overrides.

```ts
// tailwind.config.ts (excerpt)
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { /* design tokens here */ },
      spacing: { /* spacing tokens */ },
      fontFamily: { /* typography tokens */ },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
```

---

### Design tokens and theming
- **Single source of truth:** define **colors**, **spacing**, **typography**, **radius**, and **elevation** in `tailwind.config.ts` theme. Use semantic names (e.g., `bg-primary`, `text-muted`, `space-4`) rather than raw hex values in components.  
- **Token naming:** prefer `primary`, `secondary`, `surface`, `muted`, `success`, `danger`, `warning`, `accent` for colors; `sm`, `md`, `lg` for radii; `xs`, `sm`, `md`, `lg` for spacing.  
- **Dark mode:** use `darkMode: 'class'`. Provide paired tokens for dark mode (e.g., `surface` and `surface-dark`) or use CSS variables that switch under `.dark`. Expose a **`useTheme`** hook in `src/shared/hooks` to toggle and persist theme.  
- **Runtime tokens:** if components need runtime access to tokens, expose a minimal `tokens` object from `src/shared/styles/tokens.ts` that mirrors `tailwind.config.ts` values.

---

### Component styling and utility usage
- **Composition over long strings:** prefer small, focused utility sets on elements. When a pattern repeats, extract it into a **component class** using `@apply` in a small CSS file inside the feature (e.g., `src/features/journal/styles.css`). Keep `@apply` usage limited to shared or repeated patterns only.  
- **Presentational vs container components:** presentational components accept props and use Tailwind utilities; container components handle data and pass props. Avoid embedding data logic in presentational components.  
- **Naming conventions:** component classes use `c-` prefix for CSS modules or global component classes (e.g., `.c-button`, `.c-card`). Keep Tailwind utilities in JSX and use component classes only for repeated, complex patterns.  
- **Responsive rules:** follow mobile‑first breakpoints. Use `sm:`, `md:`, `lg:`, `xl:` modifiers sparingly and test key screens at mobile, tablet, and desktop widths.  
- **Accessibility**
  - Ensure visible focus states using `focus:outline-none` paired with `focus:ring` utilities.  
  - Use semantic HTML and `aria-*` attributes for interactive elements.  
  - Maintain color contrast tokens that meet WCAG AA for text and UI controls.  
- **Animations and motion:** prefer subtle, utility‑based transitions (`transition`, `duration-150`, `ease-out`). Provide a reduced‑motion alternative using `@media (prefers-reduced-motion: reduce)`.

```css
/* src/features/journal/styles.css */
.c-card {
  @apply bg-surface rounded-md shadow-sm p-4;
}
.c-button {
  @apply inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-600;
}
```

---

### Performance, build, and CI
- **Purge/content:** ensure `content` is accurate so production builds remove unused classes. Use a **safelist** only for classes generated dynamically and document why each class is safelisted.  
- **Bundle size:** avoid large utility libraries; prefer Tailwind utilities and small helper components. Use `vite` build analysis to monitor CSS size.  
- **Caching and CDN:** deploy built CSS with CDN caching headers. Use hashed filenames produced by Vite for cache busting.  
- **Linting:** enable `eslint-plugin-tailwindcss` to enforce class order and detect invalid classes. Add a CI step to run lint and fail on Tailwind lint errors.  
- **CI considerations:** run a production build in CI occasionally (nightly or on release branches) to catch purge/content misconfigurations early.

---

### Final notes and examples
- **Where to put styles**
  - Feature‑scoped utilities and `@apply` files live in `src/features/<feature>/styles.css`.  
  - Global utilities and token helpers live in `src/styles/` and `src/shared/styles/`.  
- **Do not** create many global CSS files. Keep global CSS minimal and prefer feature scoping.  
- **Examples**
  - **Button component**
    ```tsx
    // src/shared/ui/Button.tsx
    export function Button({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
      return (
        <button
          className={`inline-flex items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-600 focus:ring-2 focus:ring-offset-2 ${className}`}
          {...props}
        >
          {children}
        </button>
      );
    }
    ```
  - **Theme hook (usage)**
    ```ts
    // src/shared/hooks/useTheme.ts
    export function useTheme() {
      // toggle .dark on document.documentElement and persist to localStorage
    }
    ```
- **Documentation:** document any extracted component classes and safelisted utilities in a short `STYLEGUIDE.md` under `src/styles/`.

---