# Daily Dots

Daily Dots is a lightweight daily journal with mood tracking, built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Create and update one journal entry per date.
- Record a mood with each entry.
- Browse, edit, and delete journal entries.
- Persistent light and dark themes.
- Simple four-dot Dailydots logo in the shared navigation.
- Route-aware page titles:
  - `Home - Dailydots`
  - `My Journals - Dailydots`
  - `Add New - Dailydots`

## Development

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

## Validation

Run the production build and lint checks:

```bash
npm run build
npm run lint
```

## Visual system

The interface uses Tailwind's neutral grey scale for page backgrounds, surfaces, borders, and text. A restrained blue primary scale is reserved for actions and selected states. The four-dot logo uses the primary blue tokens and stays static at the left side of the shared navigation across all routes.

Theme preferences are managed by the `useTheme` hook and persisted locally.

See the [style guide](src/styles/STYLEGUIDE.md) for color roles, typography, logo usage, layout, component, and accessibility conventions.
