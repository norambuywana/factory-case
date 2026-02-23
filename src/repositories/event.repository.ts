import { prisma } from "../db/prisma.js";
import { EventInput } from "../models/index.js";

export class EventRepository {
  async create(event: EventInput) {
    return prisma.event.create({
      data: {
        ...event,
        timestampServer: new Date()
      }
    });
  }

  async findById(eventId: string) {
    return prisma.event.findUnique({
      where: { eventId }
    });
  }

  async findByEquipmentId(equipmentId: string) {
    return prisma.event.findMany({
      where: { equipmentId },
      orderBy: { timestampServer: "desc" }
    });
  }
}