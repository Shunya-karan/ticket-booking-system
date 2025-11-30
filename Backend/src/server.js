import express from "express";   // REQUIRED
import app from "./app.js";
import cors from "cors";

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
