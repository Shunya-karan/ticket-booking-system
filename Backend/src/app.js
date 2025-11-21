import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import busRoutes from "./routes/busroutes.js";
const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/bus",busRoutes);

export default app
