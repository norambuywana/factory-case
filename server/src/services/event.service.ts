import { EventSchema, EventInput } from "../models/event.model.js";
import { EventProducer } from "../redis/eventProducer.js";
import { EventRepository } from "../repositories/event.repository.js";

export class EventService {
  private repo = new EventRepository();
  private producer = new EventProducer();

  async handleIncomingEvent(payload: unknown) {
    console.info("Received event:", payload);
    // Validate
    const parsed = EventSchema.safeParse(payload);
    if (!parsed.success) throw new Error(`Invalid event payload: ${parsed.error.message}`);

    const event = parsed.data as EventInput;

    // Publish event
    await this.producer.produce(event);

    return event;
  }
}