# GEMINI.md

## Project Overview

This is a full-stack TypeScript project that appears to be a web application for managing and displaying data about the world and characters of the "Chainsaw Man" manga and anime.

It uses the following technologies:

- **Backend:** [Elysia.js](https://elysiajs.com/)
- **Frontend:** [React](https://react.dev/) and [TanStack Router](https://tanstack.com/router/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Package Manager & Runtime:** [Bun](https://bun.sh/)
- **Linting:** [Oxlint](https://oxc-project.github.io/docs/guide/linter.html)
- **Formatting:** [Prettier](https://prettier.io/)

The project is structured as a monorepo with the frontend and backend code in the `src` directory. The database schema is defined in `src/db/schema.ts` and the database is seeded with data from `src/db/seedData.ts`.

## Building and Running

### Prerequisites

- [Bun](https://bun.sh/docs/installation)

### Installation

```bash
bun install
```

### Development

To start the development server, run:

```bash
bun dev
```

This will start the Vite development server for the frontend and the Elysia.js server for the backend.

### Database

The project includes several scripts for managing the database:

- **Reset:** `bun db:reset` - Resets the database.
- **Push:** `bun db:push` - Pushes schema changes to the database.
- **Seed:** `bun db:seed` - Seeds the database with initial data.
- **Studio:** `bun db:studio` - Starts the Drizzle ORM studio.
- **ERD:** `bun db:erd:build` - Generates an entity-relationship diagram.

To reset, push, seed, and generate the ERD all at once, run:

```bash
bun db
```

### Building for Production

To build the project for production, run:

```bash
bun build
```

This will create a `dist` directory with the bundled assets.

### Starting the Production Server

To start the production server, run:

```bash
bun start
```

## Development Conventions

### Code Style

The project uses [Prettier](https://prettier.io/) for code formatting. To format the code, run:

```bash
bun format
```

### Linting

The project uses [Oxlint](https://oxc-project.github.io/docs/guide/linter.html) for linting. To lint the code, run:

```bash
bun lint
```
