# ---------- BUILD ----------
FROM node:lts AS build
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src ./src
COPY prisma ./prisma
RUN npx prisma generate
RUN npm run build

# ---------- RUNTIME ----------
FROM node:lts
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "dist/server.js"]