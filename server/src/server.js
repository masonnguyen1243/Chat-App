import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./config/environment.js";
import { ConnectDB } from "./config/db.js";
import { initRoutes } from "./routes/index.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

//Initialize socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

//Store online users
export const userSocketMap = {}; // { userId: socketId }

//Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  //Emit online users to all connection clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

//Middlewares setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());
app.use(cookieParser());

app.use("/api/status", (req, res) => {
  res.send("Server is live");
});

initRoutes(app);

ConnectDB();

const PORT = ENV.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
