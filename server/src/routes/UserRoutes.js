import express from "express";
import {
  login,
  logout,
  signUp,
  verifyAccount,
} from "../controllers/UserControllers.js";

const router = express.Router();

router.post("/register", signUp);

router.post("/login", login);

router.delete("/logout", logout);

router.put("/verify-account", verifyAccount);

export default router;
