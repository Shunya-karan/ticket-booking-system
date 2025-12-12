import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/AuthRoutes.js";
import busRoutes from "./routes/BusRoutes.js";
import bookingRoutes from "./routes/BookingRoutes.js";
import adminroutes from "./routes/AdminRoute.js"


const app = express();

const allowedOrigins = [
  "https://busbuddy-hl0b.onrender.com",  // Frontend domain
  "http://localhost:5173"                // Local development
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://busbuddy-hl0b.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


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
