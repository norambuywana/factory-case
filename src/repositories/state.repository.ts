import { prisma } from "../db/prisma.js";
import { StateInput } from "../models/index.js";

export class StateRepository {
  async upsert(state: StateInput) {
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
    return prisma.currentState.findMany();
  }

  async findByEquipment(equipmentId: string) {
    return prisma.currentState.findUnique({ 
        where: { equipmentId } 
    });
  }
}