import express from "express";
import { login, logout, signUp } from "../controllers/UserControllers.js";

const router = express.Router();

router.post("/register", signUp);

router.post("/login", login);

router.delete("/logout", logout);

export default router;
