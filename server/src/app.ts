import express from "express";
import cors from "cors";
import eventRoutes from "./routes/events.js";
import stateRoutes from "./routes/states.js";
import sseRoutes from "./routes/sse.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ready', (req, res) => {
  res.status(200).json({ status: 'ready' });
});

app.use("/api/events", eventRoutes);
app.use("/api", stateRoutes);
app.use("/api", sseRoutes);

export default app;