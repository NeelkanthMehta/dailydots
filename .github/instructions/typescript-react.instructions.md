---

applyTo: '**/*.ts, **/*.tsx'
### TypeScript React Instructions

---

### Summary
**Project:** Daily Journal with Mood Tracker  
**Tech stack:** **Vite**, **React**, **Supabase**, **TypeScript** (**strict: true**), **Tailwind CSS**  
**State management:** **React Query** for server state; local `useState`/`useReducer` for UI state  
**Auth:** **Supabase Auth** using email and magic link  
**Goal:** Provide a single, synchronized instructions file that defines language, architecture, styling, data patterns, testing, CI, security, and Copilot prompt conventions for consistent development and AI assistance.

---

### Language and Tooling
- **Primary language:** **TypeScript** across the codebase. Enable **`strict: true`** in `tsconfig.json`. Avoid `any`; prefer `unknown` and narrow types quickly.  
- **Bundler and framework:** **Vite** with React functional components and hooks. Use `.ts` and `.tsx` file extensions.  
- **Styling:** **Tailwind CSS** with tokens defined in `tailwind.config.ts`. Use the `class` dark mode strategy and centralize design tokens for colors, spacing, and typography.  
- **Validation and runtime schemas:** Use **zod** for runtime validation of API responses and form inputs. Export schemas alongside TypeScript types.  
- **Formatting and linting:** Use **Prettier** and **ESLint** with TypeScript and React rules. Enforce no unused variables, consistent imports, and explicit return types on exported functions.

---

### Architecture and Styling
- **High level pattern:** Feature first organization under `src/features`. Keep UI primitives and shared utilities under `src/shared`.  
- **Recommended file layout**
  ```
  src/
    features/
      journal/
        components/
        hooks/
        api.ts
        types.ts
        JournalPage.tsx
        journal.test.tsx
      mood/
        components/
        hooks/
        api.ts
        types.ts
        MoodTracker.tsx
    shared/
      ui/
      hooks/
      lib/
    app/
    pages/
    styles/
    utils/
  ```
- **Component design**
  - **Presentational components** are pure and receive props only.  
  - **Container components** handle data fetching and side effects and pass props to presentational components.  
  - Keep components small, focused, and testable.
- **Tailwind guidance**
  - Prefer utility classes for layout and styling. Extract repeated patterns into small component classes or `@apply` utilities. Centralize tokens in `tailwind.config.ts`.  
  - Provide a **`useTheme`** hook in `src/shared/hooks` for theme toggling and persistence. Ensure visible focus states and accessible color contrast.

---

### Data Layer State Management and Security
- **Supabase client**
  - Export a single client named **`supabase`** from `src/shared/lib/supabase.ts`. Do not instantiate multiple clients.  
- **React Query**
  - Use React Query for all server state. Use descriptive query keys such as `['journal', userId, 'entries', page]`.  
  - Implement optimistic updates for create and update flows and rollback on error. Use `queryClient.invalidateQueries` for cache invalidation after successful mutations.  
- **Local UI state**
  - Use `useState` or `useReducer` for ephemeral UI state. For small global UI state such as theme or toast queue, prefer React Context; introduce Zustand only if justified.  
- **Realtime**
  - Prefer polling or React Query refetch intervals to control cost. If realtime is required, centralize subscription logic in `src/shared/lib/realtime.ts` and ensure cleanup on unmount.  
- **Authentication and database security**
  - Use **Supabase Auth** with email and magic link as the primary flow. Implement a `RequireAuth` wrapper for protected routes.  
  - Enforce Row Level Security in the database so users can only access their own data. Store minimal PII and avoid sensitive fields in plain text.  
- **Environment variables**
  - Never commit `.env` files. Use `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for client usage. Keep service role keys server-side only.

---

### Testing CI and Contribution Guidelines
- **Testing stack**
  - **Vitest** for unit tests.  
  - **React Testing Library** for component and integration tests.  
  - **msw** to mock Supabase network calls in tests.  
  - **Playwright** for a minimal smoke E2E suite covering sign-in, create entry, record mood, and sign-out. Keep E2E minimal to control CI cost.  
- **CI policy**
  - Run lint, typecheck, and unit tests on every PR. Run Playwright smoke tests on `main` or release branches only. Keep CI matrix small.  
- **Commit and PR conventions**
  - Use Conventional Commits for commit messages. PRs should be small and focused and include testing notes and migration steps when applicable. Prefer squash merges for feature branches.  
- **Documentation**
  - Keep `README.md`, `AGENT.md`, and Copilot instruction files up to date. Document non-obvious decisions in PR descriptions.

---

### Copilot Prompts Tags and Examples
- **Prompt tags**
  - Use `// COPILOT_PROMPT:` for code scaffolding and `// TEST_PROMPT:` for tests. Place the tag as the first non-comment line in generated files. Include a one-line assumptions comment after the tag.  
- **Behavior constraints for Copilot**
  - Generate concise, idiomatic TypeScript. Prefer small components and React Query patterns. Use Tailwind classes and reference `tailwind.config.ts` tokens. Never include secrets or hardcoded environment values. Avoid CSS-in-JS and unnecessary global state libraries.  
- **Prompt templates**
  - **Component scaffold**
    ```ts
    // COPILOT_PROMPT: Create a TypeScript React component in src/features/journal/components
    // Assumptions: JournalEntry type exists in ../types
    // - Uses Tailwind classes
    // - Receives props: entry: JournalEntry
    // - Pure presentational, no external state
    ```
  - **Data hook**
    ```ts
    // COPILOT_PROMPT: Create a useJournalEntries hook using React Query and supabase
    // Assumptions: supabase exported from src/shared/lib/supabase
    // - Supports pagination and optimistic add mutation
    ```
  - **Test scaffold**
    ```ts
    // TEST_PROMPT: Write a Vitest + RTL test for JournalPage that mocks useJournalEntries
    // - Assert loading, empty, and populated states
    ```
- **Example code snippets**
  ```ts
  // src/shared/lib/supabase.ts
  import { createClient } from '@supabase/supabase-js';

  export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  ```

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

---

### Final notes
- Keep all generated code **reviewed** for types, security, and accessibility before merging.  
- Favor clarity and maintainability over cleverness.  
- Update this instructions file when major architectural or process changes occur.