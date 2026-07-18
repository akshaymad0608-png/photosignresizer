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
