import express from "express";
import { redisSubscriber } from "../redis/redisClient.js";

const router = express.Router();

router.get("/events/stream", async (req, res) => {
  console.info("Client connected to SSE stream");
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();
  res.write(": connected\n\n");

  const onMessage = () => {
    res.write(`event: update\n`);
    res.write(`data: {"message":"state-changed"}\n\n`);
  };

  await redisSubscriber.subscribe("events_channel");
  redisSubscriber.on("message", onMessage);

  req.on("close", async () => {
    redisSubscriber.removeListener("message", onMessage);
    await redisSubscriber.unsubscribe("events_channel");
  });
});

export default router;