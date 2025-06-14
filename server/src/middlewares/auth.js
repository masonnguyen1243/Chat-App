import { ENV } from "../config/environment.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const protectedRoutes = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "Token not found" });
    }

    const decoded = jwt.verify(token, ENV.JWT_ACCESS_TOKEN_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (error?.message?.includes("jwt expired")) {
      return res.status(403).json({ message: "Token expired" });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};
