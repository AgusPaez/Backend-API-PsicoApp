import { Application } from "express";
import userRoutes from "../routes/user.routes";
import contentMainRoutes from "../routes/contentMain.routes";
import authRoutes from "../routes/auth.routes";
import contentStudies from "../routes/contentStudies.routes";
// import productRoutes from "../routes/product.routes";

export const register = async (app: Application) => {
  app.use("/users", userRoutes);
  app.use("/contentMain", contentMainRoutes);
  app.use("/contentStudies", contentStudies);
  app.use("/auth", authRoutes);
  //   app.use("/product",productRoutes);
  console.log("✅ Routes registered");
};
