import express from "express";
import cors from "cors";
import eventRoutes from "./routes/events";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ready', (req, res) => {
  res.status(200).json({ status: 'ready' });
});

app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});

export default app;