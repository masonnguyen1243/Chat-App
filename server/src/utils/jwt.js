import jwt from "jsonwebtoken";
import { ENV } from "../config/environment.js";

export const generateAccessToken = (userId, userRole) => {
  const accessToken = jwt.sign(
    { userId, userRole },
    ENV.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRED,
    }
  );

  return accessToken;
};
