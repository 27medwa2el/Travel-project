# Prisma & PostgreSQL Migration Guide

This project has been migrated from an in-memory mock store to a real database using **Prisma** and **PostgreSQL**.

## 1. Database Schema
The new schema is located at `prisma/schema.prisma`. It mirrors the models defined in `domain.ts` but adds relational fields and Clerk `userId` integration.

## 2. Environment Variables
You must update your `.env` or `.env.local` file with your PostgreSQL connection strings:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

## 3. Getting Started
After setting your `DATABASE_URL`, run the following commands to initialize your database:

```bash
# Generate Prisma Client
npx prisma generate

# Create the initial migration and apply it to the database
npx prisma migrate dev --name init
```

## 4. Migration Progress
I have already updated the following core components to use Prisma:
- **Models**: `Country`, `City`, `Activity`, `CityEvent`, `Trip`.
- **Pages (SSR)**: `index.tsx`, `dashboard.tsx`, `details.tsx`.
- **API Routes**:
  - `/api/admin/countries` (GET, POST)
  - `/api/admin/cities` (GET, POST, PUT, DELETE)
  - `/api/admin/activities` (GET, POST, PUT, DELETE)
  - `/api/admin/events` (GET, POST)
  - `/api/trips` (GET, POST)

## 5. Remaining Tasks
The following models still need their API routes updated to use Prisma (following the same pattern):
- `Driver`, `CityCar`, `CityTourGuide`, `CityApplication`, `CityTip`, `CityDocument`, `CityRecommendedItem`.
- `Booking` (user bookings).

## 6. Pattern for Updates
When updating an API route, replace:
```typescript
import { someStore } from '@/lib/mockStore';
// ...
const data = someStore.getAll();
```
with:
```typescript
import { prisma } from '@/lib/prisma';
// ...
const data = await prisma.someModel.findMany();
```

## 7. User Association
For user-private data (Trips, Bookings), always use the Clerk `userId` from `getAuth(req)` in your Prisma queries:
```typescript
const trips = await prisma.trip.findMany({ where: { userId } });
```
