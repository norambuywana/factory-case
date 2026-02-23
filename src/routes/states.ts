import express from "express";
import { StateRepository } from "../repositories/state.repository";
import { EventRepository } from "../repositories/event.repository";

const router = express.Router();
const stateRepo = new StateRepository();
const eventRepo = new EventRepository();

router.get("/state", async (_, res) => {
  const states = await stateRepo.findAll();
  
  res.json(states);
});

router.get("/state/:id", async (req, res) => {
  const { id } = req.params;
  const state = await stateRepo.findByEquipmentId(id);
  if (!state) return res.status(404).send("Not found");

  res.json(state);
});

router.get("/history/:equipmentId", async (req, res) => {
  const { equipmentId } = req.params;
  const events = await eventRepo.findByEquipmentId(equipmentId);

  res.json(events);
});

export default router;