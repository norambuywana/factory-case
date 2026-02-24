import express from "express";
import { StateRepository } from "../repositories/state.repository";
import { EventRepository } from "../repositories/event.repository";

const router = express.Router();
const stateRepo = new StateRepository();
const eventRepo = new EventRepository();

router.get("/state", async (_, res) => {
  console.info("Get all states");
  const states = await stateRepo.findAll();
  
  res.json(states);
});

router.get("/state/:equipmentId", async (req, res) => {
  console.info(`Get state for equipmentId: ${req.params.equipmentId}`);
  const { equipmentId } = req.params;
  const state = await stateRepo.findByEquipmentId(equipmentId);
  if (!state) return res.status(404).send("Not found");

  res.json(state);
});

router.get("/history/:equipmentId", async (req, res) => {
  console.info(`Get history for equipmentId: ${req.params.equipmentId}`);
  const { equipmentId } = req.params;
  const events = await eventRepo.findByEquipmentId(equipmentId);

  res.json(events);
});

export default router;