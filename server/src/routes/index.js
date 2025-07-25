import UserRoutes from "./UserRoutes.js";
import MessageRoutes from "./MessageRoutes.js";

export const initRoutes = (app) => {
  app.use("/api/user", UserRoutes);
  app.use("/api/messages", MessageRoutes);
};
