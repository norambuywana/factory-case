import "dotenv/config";
import { StreamProcessor } from "./streamProcessor.js";
import { EventSchema } from "../models/event.model.js";
import z from "zod";
import { StateRepository } from "../repositories/state.repository.js";
import { StateInput } from "../models/index.js";

const STREAM_KEY = process.env.REDIS_STREAM_KEY || "events";
const GROUP_NAME = process.env.REDIS_GROUP_NAME || "state_updater_group";

export class EventConsumer {
  private processor;
  private repo = new StateRepository();

  constructor(consumerName = "worker-1") {
    this.processor = new StreamProcessor({
      streamKey: STREAM_KEY,
      group: GROUP_NAME,
      consumerName,
      schema: EventSchema,
      handler: this.handleEvent.bind(this),
      deadLetterStream: "events_dlq",
    });
  }

  private async handleEvent(event: z.infer<typeof EventSchema>) {
    if (!event.eventId) throw new Error("Missing event ID");

    const stateInput: StateInput = {
      equipmentId: event.equipmentId,
      state: event.newState,
      lastChangedAt: event.timestampClient,
      lastEventId: event.eventId
    };

    await this.repo.upsert(stateInput);
  }

  async start() {
    await this.processor.start();
  }
}   