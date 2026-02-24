import { prisma } from "../db/prisma.js";
import { StateInput } from "../models/index.js";

export class StateRepository {
  async upsert(state: StateInput) {
    console.info("Upserting state:", state);
    return prisma.currentState.upsert({
      where: 
        { 
            equipmentId: state.equipmentId 
        },
      update: state,
      create: state
    });
  }

  async findAll() {
    console.info("Finding all states");
    return prisma.currentState.findMany();
  }

  async findByEquipmentId(equipmentId: string) {
    console.info("Finding state by equipmentId:", equipmentId);
    return prisma.currentState.findUnique({
        where: { equipmentId } 
    });
  }
}