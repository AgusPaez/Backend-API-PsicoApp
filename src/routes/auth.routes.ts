import { Router } from "express";
import * as authController from "../controllers/auth.controller";

const router = Router();

// REGISTER
router.post("/signUp", authController.signUp);
// INICIAR SESION
router.post("/login", authController.logIn);
export default router;
