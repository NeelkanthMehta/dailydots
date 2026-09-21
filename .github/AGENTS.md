# AGENTS.md

---

## Purpose
This file is the authoritative agent coordination document for the repository. It lists the active instruction files, defines **rule priority** for resolving conflicts, and specifies mandatory operational rules agents must follow when generating code, docs, or suggestions.

---

## Active referenced instruction files
| **File** | **Path** | **Purpose** |
|---|---:|---|
| **COPILOT_INSTRUCTIONS.md** | `COPILOT_INSTRUCTIONS.md` | Copilot prompt templates, generation constraints, and tagging conventions. |
| **design.instructions.md** | `design.instructions.md` | Visual system and Notion-like UI rules; forbids emojis and purple gradients. |
| **TypeScript React Instructions** | `docs/typescript-react-instructions.md` | Language, patterns, React Query, Supabase, and example snippets. |
| **Tailwind CSS Instructions** | `docs/tailwind-instructions.md` | Tailwind setup, tokens, `@apply` rules, safelist guidance, and examples. |
| **STYLEGUIDE.md** (optional) | `src/styles/STYLEGUIDE.md` | Local style notes, component classes, and safelisted utilities. |
| **design.tokens (example)** | `tailwind.config.ts` | Single source of design tokens referenced by styling docs. |

---

## Rule priority (highest → lowest)
When instruction files conflict, follow the highest-priority rule. If ambiguity remains, prefer the more restrictive rule and document the decision.

1. **System and platform policies** (external legal/security/platform rules).  
2. **AGENTS.md** (this file) — defines how agents interpret and reconcile other docs.  
3. **COPILOT_INSTRUCTIONS.md** — Copilot prompt templates, tags, and generation constraints.  
4. **design.instructions.md** — visual system and UI constraints (e.g., Notion look, no emojis, no purple gradient).  
5. **TypeScript React Instructions** — language, architecture, and data patterns.  
6. **Tailwind CSS Instructions** — styling tokens and `@apply` rules.  
7. **STYLEGUIDE.md** and feature-level style files (`src/features/*/styles.css`).  
8. **Generated examples and scaffolds** (scaffolding files, tests, example components).

---

## Conflict resolution process
1. **Apply the higher-priority rule.** If two rules at the same priority conflict, prefer the more restrictive one.  
2. **Annotate the decision.** When an agent or contributor follows a higher-priority rule that overrides a lower-priority doc, add a short **Rule Decision** note in the PR describing which rule was followed and why.  
3. **Propose doc updates.** If conflicts recur, open a PR to update the lower-priority document so future conflicts are prevented.

---

## Mandatory agent rules
- **No secrets in code**: never include API keys, service role keys, or `.env` values in generated code or examples.  
- **TypeScript strictness**: assume `strict: true`. Avoid `any`. Use `unknown` and narrow types.  
- **Single Supabase client**: reference the exported `supabase` from `src/shared/lib/supabase.ts`. Do not instantiate multiple clients.  
- **React Query for server state**: prefer React Query patterns for fetching, caching, optimistic updates, and invalidation.  
- **Tailwind tokens**: reference semantic tokens from `tailwind.config.ts`. Avoid ad-hoc hex colors in components.  
- **Design constraints**: follow `design.instructions.md` exactly for visual rules. **Do not** use emojis or purple gradients anywhere.  
- **Prompt tags**: include `// COPILOT_PROMPT:` or `// TEST_PROMPT:` as the first non-comment line in AI-generated files. Add a one-line assumptions comment after the tag.  
- **Accessibility**: generated UI must use semantic HTML, visible focus states, and ARIA attributes where appropriate.  
- **Testing**: include Vitest + React Testing Library tests for new components and use `msw` to mock Supabase calls when applicable. Keep Playwright E2E minimal.  
- **No CSS-in-JS**: do not introduce styled-components, emotion, or similar libraries unless explicitly approved by a higher-priority doc.  
- **No unsolicited exports**: do not create or offer file exports (PDF, CSV, XLSX, DOCX, PPTX, SVG) unless the user explicitly requests them.

---

## Agent output labeling and provenance
- **AI scaffolds** must include:
  ```
  // COPILOT_PROMPT: ...
  // Assumptions: ...
  // REVIEW: verify types, security, accessibility
  ```
- **Tests** must include:
  ```
  // TEST_PROMPT: ...
  // REVIEW: verify mocks and accessibility
  ```
- **Human review note**: generated files must include `// REVIEW: verify types, security, accessibility` near the top.  
- **Change log**: when an agent modifies an instruction file, include a `CHANGELOG` entry in the PR describing the change and rationale.

---

## PR and CI enforcement rules
- **Pre-merge checks**: every PR must pass lint, typecheck, and unit tests. Playwright smoke tests run on `main` or release branches.  
- **PR description**: include a **Rule Decision** section if any instruction conflict was encountered and resolved.  
- **Review checklist** (add to PR template)
  - Types and `strict` compliance
  - No secrets or hardcoded env values
  - Accessibility checks (keyboard, focus, ARIA)
  - Tailwind token usage and no purple gradients
  - Tests added or updated
  - Prompt tags present for AI-generated files

---

## Governance and updates
- **Who can update**: maintainers and core contributors may propose updates via PR. Changes to AGENTS.md require at least two reviewers.  
- **Versioning**: add a `Version: x.y.z` header to instruction files and update it for breaking changes.  
- **Review cadence**: review instruction files quarterly or when a major architectural change occurs. Record outcomes in `docs/INSTRUCTION_UPDATES.md`.

---

## Operational guidance for agents
- **When asked for code or design**: produce minimal, focused examples that follow the instruction files. Provide only what the user requested; avoid extra files unless asked.  
- **When instructions conflict**: follow the Rule Priority section and document the decision in the PR.  
- **When generating UI**: ensure the output matches `design.instructions.md` for spacing, typography, and color tokens; explicitly avoid emojis and purple gradients.  
- **When generating prompts**: use the exact prompt templates from `COPILOT_INSTRUCTIONS.md` and include the required tags.  
- **When uncertain**: make a best-effort choice consistent with higher-priority docs and document the assumption in the generated file and PR.

---

## Quick reference snippets

**Top-of-file tag for Copilot scaffolds**
```ts
// COPILOT_PROMPT: Create a TypeScript React component in src/features/journal/components
// Assumptions: JournalEntry type exists in ../types
// REVIEW: verify types, security, accessibility
```

**Top-of-file tag for tests**
```ts
// TEST_PROMPT: Write a Vitest + RTL test for JournalPage that mocks useJournalEntries
// REVIEW: verify mocks and accessibility
```

---

## Final notes
- This file is the authoritative agent coordination document. Keep it synchronized with the referenced instruction files.  
- If you want, I can generate a PR template that enforces the **Rule Decision** section and the **Review checklist**, or update AGENTS.md to include a `Version` header and changelog template. Which would you like next?