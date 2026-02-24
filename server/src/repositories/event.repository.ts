import { prisma } from "../db/prisma.js";
import { EventInput } from "../models/index.js";

export class EventRepository {
  async create(event: EventInput) {
    console.info("Creating event:", event);
    return prisma.event.create({
      data: {
        ...event,
        timestampServer: new Date()
      }
    });
  }

  async findById(eventId: string) {
    console.info("Finding event by ID:", eventId);
    return prisma.event.findUnique({
      where: { eventId }
    });
  }

  async findByEquipmentId(equipmentId: string) {
    console.info("Finding events by equipmentId:", equipmentId);
    return prisma.event.findMany({
      where: { equipmentId },
      orderBy: { timestampServer: "desc" }
    });
  }
}