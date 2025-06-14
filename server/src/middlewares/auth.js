import { ENV } from "../config/environment";
import User from "../models/UserModel";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "Token not found" });
    }

    const decoded = jwt.verify(token, ENV.JWT_ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return req
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error?.message?.includes("jwt expired")) {
      return res.status(403).json({ message: "Token expired" });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};
