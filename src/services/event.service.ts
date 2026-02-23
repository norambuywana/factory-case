import { EventSchema, EventInput } from "../models/event.model.js";
import { EventRepository } from "../repositories/event.repository.js";

export class EventService {
  private repo = new EventRepository();

  async handleIncomingEvent(payload: unknown) {
    // Validate
    const parsed = EventSchema.safeParse(payload);
    if (!parsed.success) throw new Error("Invalid event payload");

    const event = parsed.data as EventInput;

    // Check duplicate
    if (event.eventId) {
      const exists = await this.repo.findById(event.eventId);
      if (exists) throw new Error('Already processed');
    }

    // Create event
    const created = await this.repo.create(event);

    return created;
  }
}