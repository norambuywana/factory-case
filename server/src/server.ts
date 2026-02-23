import { createServer } from 'node:http';
import app from "./app";
import { EventConsumer } from './redis/streamConsumer';

const PORT = process.env.PORT || 3000;
const server = createServer(app);
const consumer = new EventConsumer(`consumer-${process.pid}`);

server.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});

consumer.start().catch((err) => {
  console.error("Stream consumer failed:", err);
});

export default app;