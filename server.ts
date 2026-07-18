import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Basic security and setup
  // 50mb was the old limit. Nothing here accepts a body that large, and an
  // unauthenticated 50mb endpoint is a cheap denial-of-service target.
  app.use(express.json({ limit: "100kb" }));

  // WARNING: this is a no-op, not a rate limiter. It calls next() every time.
  // Before exposing any real endpoint publicly, replace it with express-rate-limit:
  //   import rateLimit from "express-rate-limit";
  //   const rateLimiter = rateLimit({ windowMs: 60_000, max: 30 });
  const rateLimiter = (_req: any, _res: any, next: any) => next();

  // Old tool URLs that were indexed before the catalogue was trimmed. A real
  // 301 here beats a client-side redirect: Google transfers the ranking signal
  // and drops the dead URL instead of recording a soft 404.
  const RETIRED_TOOLS = [
    "jpg-", "png-", "heic-", "pdf-", "word-", "mp4-", "video-", "mov-", "wav-", "rar-",
    "merge-pdf", "split-pdf", "compress-pdf", "unlock-pdf",
    "video-compressor", "trim-video", "crop-image",
    "metadata", "palette", "watermark",
  ];
  app.get("/tools/:toolId", (req, res, next) => {
    if (RETIRED_TOOLS.includes(req.params.toolId)) {
      return res.redirect(301, "/free-image-tools");
    }
    next();
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "PhotoResizer core API online" });
  });

  // Example API route for converting logic (extensible for MP4 to MP3, PDF to Word etc.)
  app.post("/api/convert", rateLimiter, async (req, res) => {
    // Validation, File Processing, AI Tools, etc.
    res.json({ success: true, message: "Conversion endpoint placeholder." });
  });

  // AI Endpoint Placeholder
  app.post("/api/ai/upscale", rateLimiter, async (req, res) => {
    res.json({ success: true, message: "AI upscaler endpoint placeholder." });
  });
  
  // Analytics Endpoint Placeholder.
  // NOTE: unauthenticated. It returns hardcoded numbers today, so nothing real
  // leaks, but add auth before it ever reads from a database.
  app.get("/api/admin/stats", rateLimiter, (_req, res) => {
    res.json({ success: true, conversions: 1200000, activeUsers: 45000 });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support SPA routing in Express 4 / Express 5
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
