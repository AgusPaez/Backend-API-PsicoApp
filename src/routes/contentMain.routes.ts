// imports
import { Router } from "express";
import * as contentMainController from "../controllers/contentMain.controller";
import { upload } from "../config/cloudinary";
// import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
// .use(authMiddleware);

// get all content
router.get("/", contentMainController.findAll);
// create first and unique content
router.post(
  "/",
  upload.single("image"),
  contentMainController.createContentMain
);
// get part of content to ID
router.get("/:id", contentMainController.getOne);
// delete all content
router.delete("/:id", contentMainController.destroy);
// update content main
router.put("/:id", contentMainController.update);

export default router;
