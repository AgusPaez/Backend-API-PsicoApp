// imports
import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { upload } from "../config/cloudinary";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
// .use(authMiddleware);

// get all users
router.get("/", userController.findAll); //hacer find de otros argumentos
// create one user
router.post("/", upload.single("image"), userController.createUser);
// get one user for ID
router.get("/:id", userController.getOne);
// delete one user
router.delete("/:id", userController.destroy);
// update user
router.patch("/:id", upload.single, userController.update);

export default router;
