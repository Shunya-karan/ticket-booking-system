// import dotenv from "dotenv";
// dotenv.config();
import app from "./app.js";

const PORT = 3000;
// console.log("JWT SECRET:", process.env.JWT_SECRET);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
