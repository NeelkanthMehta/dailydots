---

applyTo:  '**'

---

## General Instructions

---

### Overview
**Purpose:** Define high-level project preferences, design principles, programming language choices, and developer expectations for the Daily Journal with Mood Tracker repository.  
**Audience:** GitHub Copilot, contributors, and future maintainers.  
**Scope:** Design principles, language and tooling, architecture constraints, UX and accessibility expectations, testing and CI guidance, contribution etiquette, and Copilot usage conventions.

---

### Design principles
- **Simplicity first.** Prioritize clear, minimal interfaces that let users journal quickly and record mood with one or two taps.  
- **Progressive enhancement.** Build core features that work offline or with intermittent connectivity and add realtime or sync features only when necessary.  
- **Consistency.** Use a small set of UI primitives and Tailwind design tokens to keep the visual language consistent across the app.  
- **Performance mindful.** Favor small bundles, lazy loading, and caching to keep the app fast on low-end devices and slow networks.  
- **Privacy by default.** Minimize data collection, store only what is necessary, and default to private user data access.

---

### Programming language and tooling
- **Primary language:** **TypeScript** across the entire codebase.  
- **TypeScript policy:** **strict true** enabled in `tsconfig.json`. Avoid `any`. Use `unknown` when necessary and narrow types quickly.  
- **Styling:** **Tailwind CSS** with tokens defined in `tailwind.config.ts`. Use `class` dark mode strategy.  
- **Bundler and framework:** **Vite** with **React** using functional components and hooks.  
- **Backend:** **Supabase** for database, auth, and optional realtime. Export the Supabase client as **supabase** from `src/shared/lib/supabase.ts`.  
- **State and data fetching:** **React Query** for server state and `useState` or `useReducer` for local UI state.  
- **Runtime constraints:** Keep third-party runtime dependencies minimal and prefer small, well-maintained libraries.

---

### Architecture and file organization
- **High-level pattern:** Feature-first organization under `src/features`.  
- **Core folders:** `src/features`, `src/shared`, `src/app`, `src/pages`, `src/styles`, `src/utils`.  
- **Feature folder contents:** `components`, `hooks`, `api.ts`, `types.ts`, `*.test.tsx`.  
- **Shared responsibilities:** `shared/ui` for primitives, `shared/lib` for clients and utilities, `shared/hooks` for cross-feature hooks including **useTheme**.  
- **API surface:** Keep Supabase queries in `api.ts` files per feature and do not mix UI and data access.  
- **Single source of truth:** Centralize configuration and tokens in `tailwind.config.ts`, `src/shared/lib/supabase.ts`, and `src/shared/lib/queryClient.ts`.

---

### UI and UX expectations
- **Mobile-first design.** Optimize layout and interactions for phones first and scale up.  
- **One-action journaling.** Make creating an entry and recording mood as frictionless as possible.  
- **Accessible components.** Use semantic HTML, visible focus states, and ARIA attributes where needed.  
- **Feedback and error states.** Provide clear success, loading, and error states for network operations.  
- **Theming.** Support light and dark themes using Tailwind tokens and a **useTheme** hook.

---

### Security and privacy
- **Auth:** Use Supabase Auth with email and magic link as the primary flow.  
- **Secrets:** Never commit secrets. Use environment variables for keys and keep service role keys server-side only.  
- **RLS:** Enforce Row Level Security in the database so users can only access their own data.  
- **Data minimization:** Store only necessary fields for journal entries and mood tracking and avoid storing sensitive PII.  
- **Client safety:** Do not embed service keys or credentials in client code.

---

### Testing, CI, and deployment
- **Testing stack:** Vitest for unit tests, React Testing Library for component tests, Playwright for a minimal smoke E2E suite.  
- **Mocking:** Use msw to mock Supabase network calls in tests.  
- **CI policy:** Run lint, typecheck, and unit tests on every PR. Run Playwright smoke tests on `main` or release branches only. Keep CI matrix small to control cost.  
- **Deployment:** Deploy static frontend to Vercel or Netlify and use platform environment variables for Supabase keys. Manage DB migrations and RLS via the Supabase dashboard.

---

### Developer experience and contribution guidelines
- **Commits and PRs:** Use Conventional Commits. PRs must include testing notes and a short summary of changes. Prefer small, focused PRs.  
- **Code reviews:** Review for types, accessibility, and tests. Prefer readability and maintainability over clever optimizations.  
- **Documentation:** Keep `README.md`, `AGENT.md`, and this custom instructions file up to date. Document non-obvious decisions in PR descriptions.  
- **Copilot usage:** Tag AI-generated scaffolding with `// COPILOT_PROMPT` or `// TEST_PROMPT` at the top of generated files and review generated code before merging.

---

### Design tokens and visual system
- **Tokens location:** `tailwind.config.ts` theme section.  
- **Core tokens:** **colors**, **spacing**, **typography**, **radius**, **elevation**.  
- **Component primitives:** Button, Input, Textarea, Modal, Toast, Badge. Keep primitives minimal and composable.  
- **Iconography:** Use a single icon set such as Heroicons and prefer inline SVG components for accessibility and styling.

---

### Recommended defaults and conventions
- **Date format:** Use ISO 8601 for storage and UTC for server timestamps and convert to local time for display.  
- **IDs:** Use UUIDs for primary keys.  
- **Query keys:** Use descriptive arrays such as `['journal', userId, 'entries', page]`.  
- **Error handling:** Return typed error objects and show user-friendly messages.  
- **Form validation:** Use zod for runtime validation and schema-driven forms.

---

### Copilot and automation guidance
- **Prompt tags:** Use `// COPILOT_PROMPT:` for code scaffolding and `// TEST_PROMPT:` for tests. Place the tag as the first non-comment line in generated files.  
- **Prompt clarity:** Be explicit about props, hooks, and dependencies in prompts. Include assumptions as a one-line comment.  
- **Generated code review:** Always review and adapt AI-generated code for types, security, and accessibility before merging.

---

### Final notes
- **Evolve intentionally.** Update this file when major architectural or process changes occur.  
- **Favor clarity.** When in doubt, choose the simplest, most maintainable approach.  
- **Keep cost in mind.** Optimize for low CI and hosting costs while preserving a good developer experience.