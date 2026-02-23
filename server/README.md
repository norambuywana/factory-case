# Factory case

## Installation

```bash
npm install
```

## Run locally

Build and run docker containers

```bash
docker compose up --build
```
Run db migration in container 

```bash
docker compose exec api npx prisma migrate deploy
```