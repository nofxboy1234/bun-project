# Gemini Code-aware Context

## Project Overview

This is a full-stack web application built with [Bun](https://bun.sh/), a fast all-in-one JavaScript runtime. The project uses a modern TypeScript-based stack.

### Backend

*   **Runtime:** Bun
*   **Web Server:** Bun's native `serve` function is used to create the backend server, which is defined in `src/index.tsx`.
*   **API:** A RESTful API for managing tasks is implemented under the `/api` route.
    *   **Note:** The API currently uses a temporary in-memory array for data storage.
*   **Database:**
    *   **ORM:** [Drizzle ORM](https://orm.drizzle.team/) is used for database access.
    *   **Database:** The project is configured for PostgreSQL.
    *   **Schema:** The database schema is defined in `src/db/schema.ts`.

### Frontend

*   **Framework:** [React](https://react.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/) is used for the development server and bundling.
*   **Routing:** [TanStack Router](https://tanstack.com/router/) handles client-side routing.
*   **Data Fetching:** [TanStack Query](https://tanstack.com/query/) is used for managing server state.

## Building and Running

### Development

The development environment consists of two separate processes running in parallel:

1.  **Backend Server (Bun):**
    *   This server provides the API endpoints.
    *   Run the following command to start the backend server with hot-reloading:
        ```bash
        bun dev
        ```

2.  **Frontend Server (Vite):**
    *   This server provides the React user interface and proxies API requests to the backend.
    *   Run the following command to start the Vite development server:
        ```bash
        bun dev:vite
        ```

### Production

To build and run the application in production:

1.  **Build the application:**
    ```bash
    bun build
    ```
2.  **Start the server:**
    ```bash
    bun start
    ```

### Database Commands

*   **Apply Schema Changes:** To push the schema defined in `src/db/schema.ts` to the database:
    ```bash
    bun db:push
    ```
*   **Seed the Database:** To populate the database with initial data:
    ```bash
    bun seed
    ```
*   **Drizzle Studio:** To open the Drizzle ORM web GUI for inspecting the database:
    ```bash
    bun db:studio
    ```

## Development Conventions

*   **Code Style:** The project uses [Prettier](https://prettier.io/) for code formatting and [ESLint](https://eslint.org/) for linting.
    *   **Format code:** `bun format`
    *   **Run linter:** `bun lint`
*   **TypeScript:** The entire codebase is written in TypeScript. Check for type errors with `bun ts`.
*   **API Development:** The backend API routes are defined directly in `src/index.tsx` using Bun's native `serve` function.
*   **Database Modeling:** The database schema is managed with Drizzle ORM. All table and relation definitions are located in `src/db/schema.ts`.
*   **Frontend Components:** React components are located in the `src/` directory, with routing managed by files in `src/routes/`.
