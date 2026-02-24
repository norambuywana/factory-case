import { EventSchema, EventInput } from "../models/event.model.js";
import { EventProducer } from "../redis/eventProducer.js";
import { StateRepository } from "../repositories/state.repository.js";

export class EventService {
  private stateRepo = new StateRepository();
  private producer = new EventProducer();

  async handleIncomingEvent(payload: unknown) {
    console.info("Received event:", payload);
    // Validate
    const parsed = EventSchema.safeParse(payload);
    if (!parsed.success) throw new Error(`Invalid event payload: ${parsed.error.message}`);

    // Get previous state
    const currentState = await this.stateRepo.findByEquipmentId(parsed.data.equipmentId);
    parsed.data.prevState = currentState?.state;

    const event = parsed.data as EventInput;

    // Publish event
    await this.producer.produce(event);

    return event;
  }
}