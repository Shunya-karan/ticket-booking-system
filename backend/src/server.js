const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Routes - notice the path
app.use("/api", require("./routes/auth"));

app.get("/", (req, res) => {
  res.json({ message: "BusBuddy API is running!" });
});

const PORT = 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Database Connected & Synced");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err);
  });