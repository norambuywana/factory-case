import express from "express";
import { EventService } from "../services/event.service.js";

const router = express.Router();
const eventService = new EventService();

router.post("/", async (req, res) => {
  try {
    const result = await eventService.handleIncomingEvent(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: (err as Error).message });
  }
});

export default router;