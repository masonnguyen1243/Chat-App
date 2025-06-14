import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/environment.js";
import { ConnectDB } from "./config/db.js";
import { initRoutes } from "./routes/index.js";

const app = express();

app.use(express.json({ limit: "4mb" }));
app.use(cors());
app.use(cookieParser());

app.use("/api/status", (req, res) => {
  res.send("Server is live");
});

initRoutes(app);

ConnectDB();

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
