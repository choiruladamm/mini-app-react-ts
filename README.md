# Mini Task & Store App

A feature-based React app with mini task management and mini store functionality, built using React, TypeScript, Vite, Redux & Redux Toolkit, and Styled Components. Includes a login page with mock credentials for testing.

## Tech Stack

- React + TypeScript
- Vite
- Redux & Redux Toolkit
- Styled Components

## Features

- **Mini Task Management**: Manage tasks with a simple interface (no authentication).
- **Mini Store**: Browse and manage store items with authentication.
- **Authentication**: Login page with mock credentials.

## Mock Login Credentials
For testing the login page:
- **Email**: `user@example.com`
- **Password**: `password` 

## Project Structure

```
src/
├── app/                   # App routing setup
│   ├── root-layout.tsx    # Root layout component
│   └── router.tsx         # Routing configuration
├── assets/                # Static assets (images, fonts, etc.)
├── components/            # Shared UI components
│   ├── footer.tsx         # Footer component
│   ├── global-styled.ts   # Global Styled Components styles
│   ├── guards.tsx         # Route guards
│   ├── header.tsx         # Header component
│   ├── index.ts           # Component exports
│   ├── modal.tsx          # Modal component
│   ├── not-found-page.tsx # 404 page component
│   └── site-head.tsx      # Site head (metadata, SEO)
├── features/              # Feature-based modules
│   ├── auth/              # Authentication feature
│   │   ├── components/    # Auth-specific components
│   │   ├── pages/         # Auth pages (e.g., Login)
│   │   ├── store/         # Auth Redux slice
│   │   └── auth-slice.ts  # Auth state management
│   ├── carts/             # Cart feature
│   ├── home/              # Home feature
│   └── tasks/             # Task management feature
├── helpers/               # Utility functions
├── hooks/                 # Custom React hooks
├── providers/             # Context providers (e.g., Redux Provider)
├── stores/                # Redux store setup
├── types/                 # TypeScript type definitions
├── globals.css            # Global CSS styles
└── main.tsx               # Main entry point
```

## Prerequisites

- Node.js (v16 or higher, LTS recommended)
- pnpm (install globally: `npm install -g pnpm`)
- Git

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run the Development Server

```bash
pnpm dev
```

The app will run at `http://localhost:5173`.

## Available Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build for production.
- `pnpm prod`: Build & Preview the production build locally.

## Notes

- Uses a feature-based structure for modularity.
- Routing is managed via `app/router.tsx`.
- Redux Toolkit handles state in feature-specific slices (e.g., `auth-slice.ts`).
- Styled Components is used for styling, with global styles in `global-styled.ts`.
