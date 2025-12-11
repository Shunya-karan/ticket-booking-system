import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/AuthRoutes.js";
import busRoutes from "./routes/BusRoutes.js";
import bookingRoutes from "./routes/BookingRoutes.js";

import adminroutes from "./routes/AdminRoute.js"


const app = express();

app.use(cors());
app.use(express.json());

// Fix ES module dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/admin",adminroutes)

// Serve frontend build
const distPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(distPath));

// SPA fallback (NO WILDCARD)
app.use((req, res, next) => {
  // Allow backend API routes
  if (req.url.startsWith("/api")) {
    return next();
  }

  // All other routes → return React index.html
  res.sendFile(path.join(distPath, "index.html"));
});

export default app;
