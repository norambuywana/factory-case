# Factory case API (Server)

Backend service for tracking equipment state changes.

---

## Tech Stack

- **Express** – REST API
- **Redis Streams & Pub/Sub** – Event pipeline
- **Prisma + PostgreSQL** – Data persistence
- **Zod** – Input validation
- **SSE (Server-Sent Events)** – Client-side realtime updates

---

## Routes

- `POST /api/events` – Create and publish new events  
- `GET /api/state` – Fetch states of all equipment  
- `GET /api/state/:equipmentId` – Fetch equipment state by id  
- `GET /api/history/:equipmentId` – Fetch all events for equipment by id
- `GET /api/events/stream` – SSE stream that notifies client that a state has been updated  

---

## Development Setup

### Create .env file in /server

```bash
DATABASE_URL="postgresql://app:app@db:5432/factory?schema=public"
PORT=3000
REDIS_URL=redis://redis:6379
REDIS_STREAM_KEY=events
REDIS_CHANNEL=events_channel
REDIS_GROUP_NAME=state_updater_group
```
### Install deps

```bash
npm install
```

Run Prisma generated client

```bash
npx prisma generate
```

## Run Docker

Build and run docker containers.

```bash
docker compose up --build
```
Run db migration in container 

```bash
docker compose exec api npx prisma migrate dev
```

Test connection [http://localhost:3000/ready](http://localhost:3000/ready)