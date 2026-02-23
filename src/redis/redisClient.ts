import "dotenv/config";
import Redis from "ioredis";

const REDIS_URL = process.env["REDIS_URL"] || "redis:localhost:6379";

export const redis = new Redis(REDIS_URL);
export const redisSubscriber = new Redis(REDIS_URL);

redis.on("error", (err) => console.error("Redis error:", err));
redisSubscriber.on("error", (err) => console.error("Redis subscriber error:", err));