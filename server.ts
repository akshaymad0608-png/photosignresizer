import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Basic security and setup
  app.use(express.json({ limit: "50mb" }));

  // API constraints & rate-limiting middleware mock 
  // (In production, replace with express-rate-limit)
  const rateLimiter = (req: any, res: any, next: any) => {
    // Basic rate limit logging
    next();
  };

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
  
  // Analytics Endpoint Placeholder
  app.get("/api/admin/stats", (req, res) => {
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
