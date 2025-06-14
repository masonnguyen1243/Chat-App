import UserRoutes from "./UserRoutes.js";

export const initRoutes = (app) => {
  app.use("/api/user", UserRoutes);
};
