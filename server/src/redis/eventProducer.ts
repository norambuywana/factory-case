import "dotenv/config";
import { EventInput } from "../models/event.model.js";
import { EventRepository } from "../repositories/event.repository.js";
import { redis } from "./redisClient.js";

const STREAM_KEY = process.env.REDIS_STREAM_KEY || "events";
const CHANNEL = process.env.REDIS_CHANNEL || "events_channel";

export class EventProducer {
  private repo = new EventRepository();

  async produce(event: EventInput) {
    console.info("Producing event:", event);
    const saved = await this.repo.create(event);
    const streamId = await redis.xadd(
      STREAM_KEY,
      "*",
      "payload", // Stores event payload in a string array
      JSON.stringify(saved)
    );
    await redis.publish(
      CHANNEL,
      JSON.stringify({ id: streamId, event: saved })
    );
    return { saved, streamId };
  }
}