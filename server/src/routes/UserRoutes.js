import express from "express";
import {
  login,
  logout,
  signUp,
  updateUser,
  verifyAccount,
} from "../controllers/UserControllers.js";
import { protectedRoutes } from "../middlewares/auth.js";
import { multerUploadMiddleware } from "../middlewares/multerUploadMiddleware.js";

const router = express.Router();

router.post("/register", signUp);

router.post("/login", login);

router.delete("/logout", logout);

router.put("/verify-account", verifyAccount);

router.put(
  "/update-profile",
  protectedRoutes,
  multerUploadMiddleware.upload.single("avatar"),
  updateUser
);

export default router;
