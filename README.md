# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Daily Dots

  Daily Dots is a lightweight daily journal with mood tracking, built with React, TypeScript, Vite, and Tailwind CSS.

  ## Development

  ```bash
  npm install
  npm run dev
  ```

  Run the production checks with:

  ```bash
  npm run build
  npm run lint
  ```

  ## Visual system

  The interface uses Tailwind's neutral grey scale for page backgrounds, surfaces, borders, and text. A restrained blue primary scale is reserved for actions and selected states. Light and dark theme preferences are managed by the `useTheme` hook and persisted locally.

  See the [style guide](src/styles/STYLEGUIDE.md) for the color roles, typography, layout, component, and accessibility conventions.
])
