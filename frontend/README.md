# Task Manager Frontend

A production-ready React 19 frontend for the Task Manager API, built with Vite, TypeScript, and Tailwind CSS.

## Features

- **Modern Tech Stack**: React 19, Vite, TypeScript
- **State Management**: Zustand for global state, TanStack Query for server state
- **UI & Styling**: Tailwind CSS v4 with shadcn/ui components
- **Routing**: React Router v7
- **Animations**: Framer Motion for smooth transitions
- **Forms**: React Hook Form with Zod validation
- **Theming**: Full Dark/Light mode support

## Getting Started

### Prerequisites
- Node.js 18+
- Task Manager API running locally on port 3000

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   ```
   Ensure `VITE_API_URL` points to your backend (default is `http://localhost:3000/api`).

3. Start the development server:
   ```bash
   npm run dev
   ```

## Architecture

- `src/api` - Axios client and API endpoints
- `src/components` - Reusable UI components (shadcn/ui and custom)
- `src/layouts` - Page layouts (Dashboard, Root)
- `src/pages` - Route components (Landing, Auth, Dashboard, Tasks)
- `src/store` - Zustand stores (Auth, Theme)
- `src/types` - TypeScript interfaces
- `src/lib` - Utility functions and React Query configuration

## Building for Production

```bash
npm run build
```
The output will be generated in the `dist` directory.
