import express from "express";
import cors from "cors";

import authRoutes from "./routes/AuthRoutes.js";
import busRoutes from "./routes/BusRoutes.js";
import bookingRoutes from "./routes/BookingRoutes.js";
import adminroutes from "./routes/AdminRoute.js";

const app = express();

// Allowed frontend domains
const allowedOrigins = [
  "https://busbuddy-q5rr.onrender.com", 
  "http://localhost:5173"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// Extra CORS headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") return res.sendStatus(200);
  
  next();
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/admin", adminroutes);

export default app;
