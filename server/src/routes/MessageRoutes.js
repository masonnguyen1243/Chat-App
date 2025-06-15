import express from "express";
import { protectedRoutes } from "../middlewares/auth.js";
import {
  getMessages,
  getUserForSideBar,
  markMessageAsSeen,
} from "../controllers/MessageControllers.js";

const router = express.Router();

router.get("/users", protectedRoutes, getUserForSideBar);

router.get("/:id", protectedRoutes, getMessages);

router.put("/mark/:id", protectedRoutes, markMessageAsSeen);

export default router;
