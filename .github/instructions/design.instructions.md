---
name: Design Instructions
description: This file provides design instructions for the Daily Journal with Mood Tracker app, ensuring a Notion-like look and feel.
applyTo: '**/*.{css,scss,less,ts,tsx,js,jsx,html}'
---

## Design Instructions

---

### Purpose
Provide a single, synchronized design reference for the **Daily Journal with Mood Tracker** app. The goal is to make the product look and feel **exactly like Notion** while remaining accessible, performant, and easy to implement with **TypeScript**, **React**, **Vite**, and **Tailwind CSS**. This file covers visual system, layout patterns, components, editor behavior, interactions, accessibility, theming, and Tailwind implementation notes. Avoid the use of emojis and purple gradient across the UI.

---

### Design principles
- **Notion-like simplicity**: Minimal chrome, generous whitespace, neutral surfaces, and subtle separators. Prioritize content over chrome.  
- **Content-first**: The UI should recede; content is the primary focus. Use neutral backgrounds and restrained accents.  
- **Consistency**: Reuse a small set of tokens for spacing, color, and typography. Keep components composable and predictable.  
- **Performance and accessibility**: Fast initial render, keyboard-first interactions, and WCAG AA contrast for text and controls.  
- **Privacy and clarity**: Clear affordances for saving, syncing, and sharing; avoid intrusive animations.

---

### Visual system

#### Color tokens
Use neutral, low-contrast surfaces with a single accent color for actions. **Do not** use purple gradients anywhere.

| **Token** | **Tailwind key** | **Hex** |
|---|---:|:---|
| **background** | `bg-surface` | `#FFFFFF` |
| **surface-muted** | `bg-muted` | `#F6F7F8` |
| **card** | `bg-card` | `#FFFFFF` |
| **text-primary** | `text-primary` | `#0F172A` |
| **text-muted** | `text-muted` | `#6B7280` |
| **accent** | `accent` | `#0EA5A4` |
| **success** | `success` | `#16A34A` |
| **danger** | `danger` | `#DC2626` |
| **border** | `border` | `#E6E9EE` |
| **shadow** | `shadow` | `rgba(15, 23, 42, 0.06)` |

- **Accent choice**: pick a single neutral accent (example above uses teal `#0EA5A4`). Avoid purple hues and gradients.  
- **Semantic naming**: use semantic token names (accent, surface, muted) rather than component-specific names.

#### Typography
- **Font stack**: system UI stack for performance: `Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial`.  
- **Scale**
  - **Heading large**: `text-2xl` / `font-semibold` — used for page titles.  
  - **Heading medium**: `text-xl` / `font-medium` — section headings.  
  - **Body**: `text-base` / `font-normal` — primary content.  
  - **Small**: `text-sm` / `font-normal` — metadata, timestamps.  
- **Line-height**: use relaxed line-height for body text (`leading-7`) to match Notion’s airy feel.

#### Spacing and layout tokens
- **Spacing scale**: `space-1` = 4px, `space-2` = 8px, `space-3` = 12px, `space-4` = 16px, `space-6` = 24px, `space-8` = 32px.  
- **Container widths**: content column max width ~ 760px for reading comfort; full-bleed for boards and tables.  
- **Gutters**: use `space-6` (24px) between major columns.

#### Elevation and borders
- **Subtle borders**: `border` token at 1px for separators.  
- **Shadows**: very light shadows for floating elements (modals, menus) using `shadow` token.

---

### Layout and components

#### Global layout
- **Left sidebar**: collapsible, narrow by default, shows workspace and navigation. Use icons + labels; collapse to icons only.  
- **Top bar**: minimal; contains page title, quick actions, and user menu. Keep height compact.  
- **Content column**: centered column with max width ~760px; supports blocks and inline editing.  
- **Right rail (optional)**: contextual properties, tags, or details; collapsible.

#### Core components
- **Page title**
  - Large, editable heading at top of content column.
  - Use `text-2xl font-semibold` and inline editing affordance.
- **Block container**
  - Each block is a full-width row with subtle hover background `bg-muted` and a left drag handle.
  - Use `p-4` spacing and `border-b` separators.
- **Text editor**
  - Minimal toolbar that appears on selection; inline formatting only.
  - Use contenteditable or a rich editor library with schema matching Notion blocks.
- **Database / Table**
  - Compact rows, subtle zebra or no zebra, column headers with sort controls.
  - Use `text-sm` for metadata and `text-base` for primary cell content.
- **Modal**
  - Centered, max width 640px, `bg-card`, `rounded-md`, `shadow`.
  - Use `focus:ring` for keyboard focus.
- **Button**
  - Primary: `inline-flex items-center px-4 py-2 rounded-md bg-accent text-white`.
  - Secondary: `border border-border bg-transparent text-primary`.
- **Input / Textarea**
  - `px-3 py-2 border rounded-md bg-surface` with `focus:ring-2 focus:ring-accent`.
- **Toast**
  - Small, bottom-right or top-right; `bg-card border shadow` with concise message.

#### Component composition rules
- Keep components **small and focused**. Presentational components accept props only. Container components handle data and pass props down. Co-locate styles in feature `styles.css` when repeated patterns exist.

---

### Editor and content model

#### Block model
- **Block types**: paragraph, heading, to-do, bulleted list, numbered list, quote, code, divider, image, database embed.  
- **Block behavior**
  - Blocks are reorderable via drag handle.  
  - Pressing Enter in a block creates a new block below.  
  - Backspace at empty block merges with previous block.  
- **Inline formatting**
  - Bold, italic, code, link, inline comment. Toolbar appears on selection.  
- **Database entries**
  - Each entry is a row with properties (title, date, mood tag). Use modal or right rail for property editing.

#### Editor UX
- **Keyboard-first**: support slash commands (`/`) to insert block types, `Cmd/Ctrl+K` to link, `Cmd/Ctrl+S` to save.  
- **Autosave**: save drafts locally and sync to Supabase in the background. Show a small status indicator (Saved, Saving, Offline).  
- **Undo/Redo**: support `Cmd/Ctrl+Z` and `Cmd/Ctrl+Shift+Z`.  
- **Drag and drop**: support dragging images and reordering blocks.

---

### Interactions and accessibility

#### Focus and keyboard
- Ensure all interactive elements are reachable by keyboard. Use `tabindex` and `aria` attributes.  
- Visible focus states: use `focus:ring-2 focus:ring-accent` rather than removing outlines.  
- Provide keyboard shortcuts list in a help modal.

#### Screen reader support
- Use semantic HTML for headings, lists, and tables. Provide `aria-label` and `aria-describedby` where needed. Announce autosave and sync status changes.

#### Motion and reduced motion
- Use subtle transitions (`transition duration-150 ease-out`). Respect `prefers-reduced-motion` and reduce or disable nonessential animations.

#### Error states and feedback
- Use inline validation for forms. Show clear, concise error messages. Use `danger` token for error states and `success` for confirmations.

---

### Theming and dark mode
- **Dark mode strategy**: `class` strategy. Provide `useTheme` hook to toggle and persist theme in `localStorage`.  
- **Token pairing**: define dark equivalents for surface and text tokens or use CSS variables that switch under `.dark`.  
- **Contrast**: ensure text and interactive elements meet WCAG AA in both themes.

---

### Tailwind implementation notes

- **Token mapping**: map design tokens to Tailwind theme extensions in `tailwind.config.ts`. Keep token names semantic.  
- **Component classes**: extract repeated patterns into small CSS files per feature using `@apply`. Limit `@apply` to shared or repeated patterns only.  
- **Safelist**: if dynamic classes are used, add a documented safelist in `tailwind.config.ts` with reasons.  
- **Linting**: enable `eslint-plugin-tailwindcss` and add a CI step to fail on invalid classes.  
- **Example token config**
```ts
// tailwind.config.ts (excerpt)
theme: {
  extend: {
    colors: {
      surface: '#FFFFFF',
      muted: '#F6F7F8',
      card: '#FFFFFF',
      primary: '#0F172A',
      mutedText: '#6B7280',
      accent: '#0EA5A4',
      border: '#E6E9EE',
    },
    boxShadow: {
      subtle: '0 1px 2px rgba(15,23,42,0.06)',
    },
  },
}
```

---

### Examples and code snippets

**Page title**
```tsx
<h1 className="text-2xl font-semibold text-primary">
  {title}
</h1>
```

**Block row**
```tsx
<div className="flex items-start gap-4 p-4 border-b border-border hover:bg-muted">
  <div className="w-6">/* drag handle */</div>
  <div className="flex-1">
    <div className="prose text-base leading-7">{block.content}</div>
  </div>
</div>
```

**Primary button**
```tsx
<button className="inline-flex items-center px-4 py-2 rounded-md bg-accent text-white hover:bg-accent-600 focus:ring-2 focus:ring-accent">
  Save
</button>
```

---

### Final notes
- **Avoid visual noise**: keep chrome minimal and prioritize content readability.  
- **No emojis or purple gradient**: do not introduce emojis in UI text or use purple gradients in any visual assets.  
- **Iterate visually**: compare UI to Notion for spacing, rhythm, and minimal chrome; adjust tokens to match the Notion feel.  
- **Documentation**: add a short `STYLEGUIDE.md` in `src/styles/` that lists tokens, component classes, and safelisted utilities.

If you want, I can generate a `tailwind.config.ts` starter snippet, a `useTheme` hook, or a small set of example components (PageTitle, BlockRow, EditorToolbar) that follow these rules. Which would you like next?