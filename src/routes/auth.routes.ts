//imports
import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { upload } from "../config/cloudinary";

const router = Router();

// REGISTER
router.post("/signUp", upload.single("image"), authController.signUp);

// INICIAR SESION
router.post("/login", authController.logIn);
export default router;
