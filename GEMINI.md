# GEMINI Project Context: bun-project

## Project Overview

This is a full-stack TypeScript project built with [Bun](https://bun.com), [React](https://react.dev/), and the [TanStack](https://tanstack.com/) suite. It functions as a simple task management application.

The backend server is powered by Bun's native HTTP server, which directly serves the React frontend and provides a JSON API. The frontend is built with React 19 and utilizes TanStack Router for type-safe routing and TanStack Query for asynchronous state management.

The project is structured as a monorepo-like setup within a single `package.json`, where Bun acts as the runtime for both the server and the client-side development environment.

### Key Technologies

*   **Runtime & Bundler**: Bun
*   **Backend**: Bun Native Server
*   **Frontend**: React 19, ReactDOM 19
*   **Routing**: TanStack Router
*   **Data Fetching**: TanStack Query
*   **Language**: TypeScript
*   **Linting**: ESLint
*   **Formatting**: Prettier

## Building and Running

The project's scripts are defined in `package.json` and are run using `bun`.

### Development

To start the development server with hot-reloading for both the backend and frontend:

```bash
bun dev
```

This command concurrently starts the route watcher and the Bun development server.

### Production

To build the project for production:

```bash
bun build
```

This creates an optimized build in the `dist/` directory.

To run the built production server:

```bash
bun start:js
```

Alternatively, you can run the production-ready server directly from the source:

```bash
bun start
```

### Other Commands

*   **Linting**: Check for code quality issues.
    ```bash
    bun lint
    ```

*   **Formatting**: Automatically format the code.
    ```bash
    bun format
    ```

*   **Type Checking**: Run the TypeScript compiler to check for type errors.
    ```bash
    bun ts
    ```

## Development Conventions

*   **Routing**: The application uses file-based routing managed by TanStack Router. New routes are created as `.tsx` files within the `src/routes/` directory. The route tree is generated automatically by running `bun run generate-routes`.
*   **API**: The backend API is served from the same process as the frontend. API routes are likely handled within `src/index.tsx` and are prefixed with `/api`.
*   **State Management**: Server state (e.g., tasks) is managed via TanStack Query. Use hooks like `useQuery` and `useMutation` to interact with the backend API. Client state can be managed with React hooks.
*   **Styling**: The project uses a combination of global CSS (`src/index.css`) and CSS Modules (`.module.css`) for component-level styling.
*   **Paths**: The `tsconfig.json` is configured with a path alias `@/*` pointing to `./src/*`, which should be used for cleaner imports.
