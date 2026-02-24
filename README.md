# Factory case

A full-stack TypeScript application for real-time equipment state tracking.

The system consists of:
- **Server** – Express API with Redis Streams + Pub/Sub, Prisma, PostgreSQL.
- **Client** – React dashboard (Vite) that listens via SSE for updates and refetches state data.
- **Shared** – (optional) Zod models and types shared between both.

---

## Architecture Overview

```text
[Devices] → POST /api/events
[Server] → Store in DB → XADD Redis Stream → PUBLISH "update"
[React Client] ← SSE "update" → Refetch /api/state
 ```

```text
project-root/
├─ server/      # Express API + Redis + Prisma
└─ client/      # React dashboard via Vite
 ```

