import http from "http";
import app from "./app";

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`✅ API running at http://localhost:${PORT}`);
});