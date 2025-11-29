# PayQuick - Transaction Viewer

A secure money transfer application frontend built with Next.js 16 (App Router), React 19, and TypeScript.

## Documentation

- [Frontend Architecture](docs/architecture-fe.md) - System design, component layers, state management, and security approach

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **State Management**: TanStack Query (server state) + React Context (auth state)
- **Forms**: React Hook Form + Zod validation

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Backend API running on `http://localhost:3000` (see `server/`)

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the backend (in a separate terminal)

```bash
cd server
pnpm dev
```

### 3. Start the frontend

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Test Credentials

```
Email: smith@example.com
Password: pass123
```

## Project Structure

```
pay-quick/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Public routes (login)
│   └── (protected)/       # Authenticated routes
├── components/
│   ├── ui/                # shadcn/ui primitives
│   └── features/          # Feature-specific components
├── lib/
│   ├── api/               # API client and services
│   └── auth/              # Authentication utilities
├── docs/                  # Architecture documentation
└── server/                # Mock backend API (Express)
```

## Available Scripts

| Command      | Description                           |
| ------------ | ------------------------------------- |
| `pnpm dev`   | Start development server on port 3001 |
| `pnpm build` | Build for production                  |
| `pnpm start` | Run production build                  |
| `pnpm lint`  | Run ESLint                            |

## Features

- [x] Login screen with form validation
- [x] Transaction list grouped by month
- [x] Automatic access token refresh
- [x] Logout functionality
- [x] Pagination support

## API Endpoints (Backend)

| Endpoint                | Method | Description                |
| ----------------------- | ------ | -------------------------- |
| `/api/v1/login`         | POST   | Authenticate user          |
| `/api/v1/token/refresh` | POST   | Refresh access token       |
| `/api/v1/transactions`  | GET    | Get paginated transactions |

Made by R-Jay Tedoco.
