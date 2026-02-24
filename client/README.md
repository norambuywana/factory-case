# Factory case dashboard (Client)

Lightweight **React + TypeScript** dashboard that displays live equipment states.

---

## Tech Stack

- **React 19 + Vite** – Frontend dev environment  
- **React Query (TanStack)** – Data fetching and light caching  
- **SSE (Server-Sent Events)** – Realtime update triggers
- **React Router** – Page navigation

---
## Development

```bash
npm install
npm run dev
```
App runs at ([http://localhost:5173](http://localhost:5173/))

---
## Routes
| Page                  | Route            | Description                                                                     |
| --------------------- | ---------------- | ------------------------------------------------------------------------------- |
| **Dashboard**         | `/`              | Displays all equipment and their current states. Each card is clickable.        |
| **Send Event**        | `/send`          | Allows posting a manual event with equipment ID, new state, and auto-timestamp. |
| **Equipment History** | `/equipment/:id` | Displays the event history for a single equipment (from `/api/history/:id`).    |

---
## Notes

The API has to be reachable to run