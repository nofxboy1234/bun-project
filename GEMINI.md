# Project Overview

This is a full-stack web application built with a modern JavaScript toolchain. The project uses [Bun](https://bun.sh/) as the runtime, [Vite](https://vitejs.dev/) for the frontend build, and [ElysiaJS](https://elysiajs.com/) for the backend API.

## Key Technologies

- **Runtime:** [Bun](https://bun.sh/)
- **Frontend:** [React](https://react.dev/) with [TanStack Router](https://tanstack.com/router) for routing and [TanStack Query](https://tanstack.com/query) for data fetching.
- **Framework:** [TanStack Start](https://tanstack.com/start)
- **Backend:** [ElysiaJS](https://elysiajs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Linting:** [oxlint](https://oxlint.rs/)
- **Formatting:** [Prettier](https://prettier.io/)
- **Type-checking:** [TypeScript](https://www.typescriptlang.org/)

## Project Structure

The project is organized into the following main directories:

- `src`: Contains the source code for the application.
  - `components`: Reusable React components.
  - `db`: Database-related files, including the schema, migrations, and seeding scripts.
  - `integrations`: Integration with third-party libraries like TanStack Query.
  - `routes`: Application routes, with a clear separation between API and frontend routes.
- `erd`: Contains the auto-generated Entity-Relationship Diagram (ERD).
- `dist`: Contains the built production assets.

## Database Schema

The database schema is defined in `src/db/schema.ts` and appears to model a fictional world with characters, species, locations, and their relationships. This suggests the application might be a companion app for a story, game, or a similar world-building project.

# Building and Running

## Installation

To install the project dependencies, run:

```bash
bun install
```

## Development

To start the development server, run:

```bash
bun dev
```

This will start the Vite development server for the frontend and the ElysiaJS server for the backend.

## Production

To build the project for production, run:

```bash
bun build
```

To start the production server, run:

```bash
bun start
```

## Database Commands

The project provides several scripts for managing the database:

- `bun db:reset`: Resets the database.
- `bun db:push`: Pushes schema changes to the database.
- `bun db:seed`: Seeds the database with initial data.
- `bun db:erd:build`: Generates an Entity-Relationship Diagram (ERD).
- `bun db:studio`: Starts the Drizzle Studio.
- `bun db`: A convenient script that runs `db:reset`, `db:push`, `db:seed`, and `db:erd:build` in sequence.

# Development Conventions

## Linting and Formatting

The project uses [oxlint](https.oxlint.rs) for linting and [Prettier](https://prettier.io) for code formatting. To lint the code, run:

```bash
bun lint
```

To format the code, run:

```bash
bun format
```

## Type-checking

The project uses [TypeScript](https://www.typescriptlang.org/) for static type-checking. To check for type errors, run:

```bash
bun ts
```
