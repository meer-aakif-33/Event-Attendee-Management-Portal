# Event & Attendee Management Portal

A full-stack Event & Attendee Management Portal built using modern web technologies.  
The application enables event creation, attendee registration, and enforcement of real-world business constraints such as capacity limits and duplicate prevention.

This project emphasizes clean architecture, predictable state management, and production-ready engineering practices.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Styling & UI:** Tailwind CSS, shadcn/ui
- **Forms & Validation:** React Hook Form, Zod
- **Server State:** TanStack Query
- **Notifications:** Sonner

---

## Core Features

### Event Management
- Create events with title, description, date, and capacity
- Persist events using Prisma with relational modeling
- Display events in a card-based layout with attendee counts

### Attendee Management
- Register attendees for individual events
- View attendee lists per event
- Prevent duplicate registrations via database constraints
- Enforce event capacity limits on both client and server

### Validation & Business Rules
- Shared Zod schemas across client and server
- Immediate client-side validation feedback
- Robust server-side validation and error handling
- Capacity and uniqueness enforced at the database level

### UX & Resilience
- Loading skeletons during data fetching
- Clear empty states for events and attendees
- Toast notifications for success and error states
- Near-optimistic UI via fast cache invalidation
- Global route-level error boundary for unexpected failures

---

# Project Structure

```
Event_Attendee
├── app/                    # Next.js App Router pages, layouts, and API routes
│   ├── api/                # Backend API routes (events, attendees)
│   └── events/             # Event-related pages (list, details, create)
├── components/             # Reusable UI and form components
│   ├── forms/              # Event and attendee form components
│   └── ui/                 # Shared UI primitives (buttons, cards, skeletons)
├── lib/                    # Core application logic and utilities
│   ├── api/                # Client-side API helpers
│   ├── hooks/              # Custom React and TanStack Query hooks
│   ├── validators/         # Zod schemas for validation
│   └── types/              # Shared TypeScript types
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
├── .env                    # Environment variables (not committed)
├── config files            # Next.js, Tailwind, ESLint, and tooling configs
└── README.md               # Project documentation

```


---

## API Overview

### Events
- `GET /api/events` – Fetch all events
- `POST /api/events` – Create a new event
- `GET /api/events/[id]` – Fetch event details and attendees

### Attendees
- `POST /api/attendees` – Register an attendee for an event

---

## Database Design

### Event
- One-to-many relationship with Attendees
- Capacity enforced at the application layer

### Attendee
- Unique constraint on `(email, eventId)`
- Prevents duplicate registrations per event

---

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- PostgreSQL

### Environment Variables

Create a `.env` file:

```

DATABASE_URL=postgresql://username:password@localhost:5432/eventdb

````

---

### Install Dependencies

```bash
npm install
````

---

### Prisma Setup

```bash
npx prisma migrate dev
npx prisma generate
```

---

### Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Design Decisions

* Prisma provides type-safe database access and relational integrity
* Zod serves as a single source of truth for validation logic
* TanStack Query manages server state, caching, and background updates
* shadcn/ui provides accessible, composable UI components
* Business rules are enforced server-side to ensure correctness

---

## Potential Enhancements

* Authentication and role-based access control
* Event editing and deletion
* Pagination for large datasets
* Fully optimistic UI with rollback support
* Analytics dashboard for event insights

---

## Demo

Demo video:
[demo-video-link](https://drive.google.com/)

---
## Author

Aakif Mir

