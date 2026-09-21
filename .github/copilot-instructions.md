### COPILOT INSTRUCTIONS

---

### Project summary
**Project:** Daily Journal with Mood Tracker  
**Tech stack:** Vite · React · Supabase · TypeScript (`strict: true`) · Tailwind CSS  
**State management:** React Query + local React state  
**Auth:** Supabase Auth (email + magic link)  
**Testing:** Vitest · React Testing Library · Playwright (smoke E2E)

---

### Purpose
Provide explicit, actionable guidance for **GitHub Copilot** so generated suggestions match project architecture, style, security, and cost constraints. Use this file as the canonical set of rules, prompt templates, and tags to include at the top of generated files.

---

### Behavior and constraints

- **Tone and style**
  - Generate **concise, idiomatic TypeScript**.
  - Prefer **small, focused components** and single-responsibility hooks.
  - Use **Tailwind utility classes** for styling and reference tokens from `tailwind.config.ts`.
  - Favor **React Query** patterns for server data, caching, and optimistic updates.

- **Security and secrets**
  - **Never** include secrets, keys, or `.env` values in generated code.
  - Do not suggest storing Supabase service role keys in client code.
  - Avoid recommending paid third‑party services unless justified.

- **Performance and cost**
  - Prefer polling or React Query refetch intervals over heavy realtime subscriptions.
  - Keep E2E test suites minimal; recommend smoke tests only for CI on `main` or release branches.
  - Avoid large runtime libraries unless necessary.

- **Accessibility and UX**
  - Use semantic HTML and accessible attributes.
  - Ensure keyboard focus management and visible focus states for interactive elements.
  - Provide descriptive alt text for images and labels for form controls.

- **What to avoid**
  - No CSS-in-JS libraries (styled-components, emotion).
  - No global state libraries unless a clear need exists beyond React Query.
  - No inline secrets, credentials, or hardcoded environment values.

---

### Coding conventions and file structure

- **Language**
  - Use **TypeScript** for all new files. Prefer explicit types for exported functions and components.
  - `ts` / `tsx` for code; `strict: true` in `tsconfig.json`. Avoid `any`.

- **Formatting and linting**
  - Use **Prettier** and **ESLint** with TypeScript and React rules.
  - Enforce: no unused variables, consistent imports, explicit return types on exported functions.

- **Tailwind**
  - Centralize tokens in `tailwind.config.ts` (colors, spacing, typography).
  - Extract repeated class patterns into small component classes or `@apply` utilities.

- **React Query and Supabase**
  - Centralize Supabase client in `src/shared/lib/supabase.ts` and export **`supabase`**.
  - Use descriptive query keys (arrays) and optimistic updates for create/update flows with rollback on error.
  - Keep Supabase queries in feature `api.ts` files; do not mix UI and data access.

- **Feature-first layout**
  - `src/features/<feature>/components`, `hooks`, `api.ts`, `types.ts`, `*.test.tsx`
  - `src/shared/ui` for primitives and `src/shared/lib` for clients and helpers

- **Testing**
  - Use **msw** to mock Supabase network calls in unit and integration tests.
  - Keep Playwright tests to a small smoke suite to control CI cost.

---

### Prompt templates and tags

- **General rules**
  - Add a single-line tag at the top of generated files to identify intent.
  - Use `// COPILOT_PROMPT:` for code scaffolding and `// TEST_PROMPT:` for tests.
  - Keep prompts explicit about props, hooks, and dependencies.
  - Include a one-line comment describing assumptions the generated code makes.

- **Component scaffold**
```ts
// COPILOT_PROMPT: Create a TypeScript React component in src/features/journal/components
// - Uses Tailwind classes
// - Receives props: entry: JournalEntry
// - Pure presentational, no external state
```

- **Data hook**
```ts
// COPILOT_PROMPT: Create a useJournalEntries hook using React Query and supabase
// - Supports pagination and optimistic add mutation
```

- **Test scaffold**
```ts
// TEST_PROMPT: Write a Vitest + RTL test for JournalPage that mocks useJournalEntries
// - Assert loading, empty, and populated states
```

- **Refactor or migration**
```ts
// COPILOT_PROMPT: Refactor src/features/mood/MoodTracker.tsx
// - Extract presentational MoodBadge component
// - Keep behavior identical and add unit tests
```

- **Tagging generated files**
  - The prompt tag must be the first non-comment line in generated files.
  - Add `// COPILOT_PROMPT` or `// TEST_PROMPT` and a short assumptions comment.

---

### Examples and quick reference

**Component example**
```tsx
// src/features/journal/components/JournalItem.tsx
// COPILOT_PROMPT: Presentational JournalItem component
import type { JournalEntry } from '../types';

export function JournalItem({ entry }: { entry: JournalEntry }) {
  return (
    <article className="p-4 bg-white dark:bg-slate-800 rounded-md shadow-sm">
      <time className="text-xs text-slate-500">{entry.created_at}</time>
      <p className="mt-2 text-slate-900 dark:text-slate-100">{entry.content}</p>
      <div className="mt-3 text-sm">{entry.mood}</div>
    </article>
  );
}
```

**Hook example**
```ts
// src/features/journal/hooks/useJournalEntries.ts
// COPILOT_PROMPT: React Query hook for journal entries
import { useQuery } from '@tanstack/react-query';
import { supabase } from 'src/shared/lib/supabase';
import type { JournalEntry } from '../types';

export const useJournalEntries = (userId: string) =>
  useQuery(['journal', userId, 'entries'], async () => {
    const { data, error } = await supabase
      .from('journal')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as JournalEntry[];
  });
```

**Recommended scripts**
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:watch": "vitest --watch",
  "e2e": "playwright test"
}
```

---

### CI, PRs, and final notes

- **CI**
  - Run lint, typecheck, and unit tests on every PR.
  - Run Playwright smoke tests on `main` or release branches only.

- **PR guidance**
  - Use Conventional Commits for PR titles.
  - PR body must include testing notes and migration steps if applicable.

- **Final notes**
  - Keep Copilot suggestions **minimal and pragmatic** to reduce maintenance.
  - Review and adapt all AI-generated code before merging.
  - Update this file when major architectural or process changes occur.