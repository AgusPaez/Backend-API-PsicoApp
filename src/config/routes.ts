import { Application } from "express";
import userRoutes from "../routes/user.routes";
import contentMainRoutes from "../routes/contentMain.routes";
import authRoutes from "../routes/auth.routes";
import contentStudies from "../routes/contentStudies.routes";
import appointmentRoutes from "../routes/appointment.routes";
import bondRoutes from "../routes/bond.routes";

export const register = async (app: Application) => {
  app.use("/users", userRoutes);
  app.use("/contentMain", contentMainRoutes);
  app.use("/contentStudies", contentStudies);
  app.use("/auth", authRoutes);
  app.use("/appointment", appointmentRoutes);
  app.use("/bond", bondRoutes);
  console.log("✅ Routes registered");
};
