import express from "express";
import cors from "cors";
import { ENV } from "./config/environment.js";

const app = express();

app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/status", (req, res) => {
  res.send("Server is live");
});

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
