# Project Overview

This is a React project bootstrapped with `bun init`. It uses Bun as the JavaScript runtime, package manager, and bundler. The project is configured to use TypeScript and features a simple server-side API built with Bun's built-in `serve` function.

## Key Technologies

- **Bun:** Used for runtime, package management, and bundling.
- **React:** Used for the frontend UI.
- **TypeScript:** Used for static typing.
- **ESLint:** Used for code linting.
- **Prettier:** Used for code formatting.

## Architecture

The project is a single-page application (SPA) with a simple backend API.

- **Frontend:** The frontend is built with React and is served from the `src` directory. The main component is `src/App.tsx`, which renders the `APITester` component.
- **Backend:** The backend is a simple API built with Bun's `serve` function in `src/index.tsx`. It has a few endpoints under `/api`.
- **Routing:** The server is configured to serve the `index.html` for all routes that are not matched by the API, allowing for client-side routing.

# Building and Running

- **Install dependencies:**
  ```bash
  bun install
  ```
- **Start development server:**
  ```bash
  bun dev
  ```
- **Run for production:**
  ```bash
  bun start
  ```
- **Build for production:**
  ```bash
  bun build
  ```
- **Build a standalone executable:**
  ```bash
  bun build-exe
  ```
- **Type check:**
  ```bash
  bun ts
  ```
- **Lint files:**
  ```bash
  bun lint
  ```
- **Format files:**
  ```bash
  bun format
  ```
- **Clean build artifacts:**
  ```bash
  bun clean
  ```

# Development Conventions

- **Coding Style:** The project uses ESLint for code linting and Prettier for code formatting. The ESLint configuration is in `eslint.config.ts`. `eslint-config-prettier` is used to prevent conflicts between ESLint and Prettier.
- **Testing:** There are no testing practices defined in the project.
- **Contribution:** There are no contribution guidelines defined in the project.