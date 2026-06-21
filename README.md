# WeatherGuard Admin

A minimalist, invitation-based weather alert system built with a clean, startup-ready architecture. This system allows public users to request an invite, while administrators can review requests and approve access. A background scheduler automatically simulates and dispatches weather alerts for all approved users, which are displayed in real-time on the admin dashboard.

## Features
- **Public Invite System:** Clean, minimal glassmorphism UI for users to request access.
- **Admin Dashboard:** Secure, role-based access dashboard showing pending users, approved users, and live weather alerts.
- **Automated Weather Scheduler:** NestJS cron job that runs every minute to generate weather alerts for approved users.
- **Modern Aesthetics:** Built with a premium black-and-white design system, featuring custom glassmorphism components.

## Architecture
The application is structured as a monorepo containing two distinct layers:
- **Frontend (React + Vite + Tailwind):** Manages the user interface. State management is handled through React Context (for Authentication) and TanStack Query (for server state, polling, and caching). Custom Tailwind utilities power the aesthetic.
- **Backend (NestJS + Prisma + SQLite):** A modular monolith using clean architecture principles. Controllers remain thin, routing requests to focused Services. Prisma is used as the ORM for type safety and developer productivity.

*Note on Database Decision:* While PostgreSQL was considered, SQLite was selected for this assessment to ensure rapid, zero-friction setup without requiring Docker or external services on the reviewer's machine. This aligns with the "startup-ready" mindset of focusing on functionality and developer experience first.

## Folder Structure
```
weatherguard/
├── backend/                  # NestJS API
│   ├── prisma/               # Schema and migrations
│   └── src/
│       ├── alerts/           # Alerts business logic
│       ├── auth/             # JWT Authentication and RBAC
│       ├── users/            # Invite and user management
│       └── weather/          # Cron scheduler for weather data
└── frontend/                 # React UI
    └── src/
        ├── components/ui/    # Reusable glassmorphism components
        ├── contexts/         # React Contexts (Auth)
        ├── lib/              # Axios configuration & utilities
        └── pages/            # View components
```

## Tech Stack
- **Backend:** NestJS, TypeScript, Prisma ORM, SQLite, Passport (JWT), @nestjs/schedule
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS 3, TanStack Query, React Router, Axios

## Database Schema
- **User:** `id`, `email`, `password`, `role` (ADMIN, USER), `status` (PENDING, APPROVED, REJECTED).
- **Alert:** `id`, `userId` (relation), `message`, `createdAt`.

## API Endpoints
- `POST /auth/login`: Admin authentication returning a JWT.
- `POST /users/request-invite`: Public endpoint to create a PENDING user.
- `GET /users`: (Admin) Fetch all users.
- `PATCH /users/:id/status`: (Admin) Approve or reject a user.
- `GET /alerts`: (Admin) Fetch recent weather alerts.

## Setup and Installation

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run start:dev
```
*(The seed script automatically creates the admin user: `tony.AI47Labs@gmail.com` / `tony@47`)*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Running Locally
1. Ensure the backend is running on `http://localhost:3000`.
2. Ensure the frontend is running on `http://localhost:5173`.
3. Open the frontend URL in your browser.
4. Request an invite on the home page.
5. Click "Admin Login" and sign in with `tony.AI47Labs@gmail.com` / `tony@47`.
6. Approve the pending user.
7. Wait ~1 minute, and observe the live weather alerts populating on the dashboard.

## Deployment
This project is configured to be easily deployable on modern PaaS providers:
- **Backend (Railway/Render):** Connect the repository, set the build command to `npm install && npx prisma generate && npm run build`, and the start command to `npm run start:prod`. Ensure `DATABASE_URL` and `JWT_SECRET` are set.
- **Frontend (Vercel):** Connect the repository, set the root directory to `frontend`, and Vercel will automatically detect Vite and deploy. Update the `baseURL` in `api.ts` to point to the deployed backend URL.

## Future Improvements
- Integrate actual Open-Meteo API fetching instead of simulation.
- Implement pagination for the alerts and users tables.
- Add real-time WebSockets (Socket.io) instead of TanStack Query polling for the dashboard.
