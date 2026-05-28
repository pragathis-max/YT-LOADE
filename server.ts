import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import videoInfoHandler from "./api/video-info";
import downloadHandler from "./api/download";

// Local in-memory download logs/history for the active container session
interface DownloadItem {
  id: string;
  url: string;
  videoId: string;
  title: string;
  author: string;
  thumbnailUrl: string;
  duration: string;
  quality: string;
  type: "mp4" | "mp3";
  timestamp: string;
  status: "completed" | "failed" | "processing";
  size: string;
}

const activeDownloads: DownloadItem[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Get Video Info
  app.get("/api/video-info", videoInfoHandler);

  // API Route: Trigger download (streams a styled high-fidelity media package)
  app.get("/api/download", downloadHandler);

  // Vite development server middleware configuration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Web App active on host 0.0.0.0, port ${PORT}`);
  });

  // Ensure socket connections stay active for large media packages
  server.timeout = 25 * 60 * 1000; // 25 minutes
  server.keepAliveTimeout = 25 * 60 * 1000;
  server.headersTimeout = (25 * 60 * 1000) + 5000;
}

startServer().catch((err) => {
  console.error("Backend failed to start:", err);
});
