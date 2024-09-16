// imports
import { Router } from "express";
import * as appointmentController from "../controllers/appointment.controller";

const router = Router();

// get all
router.get("/findAll", appointmentController.findAll);
// create
router.post("/", appointmentController.createAppointment);
//update
router.put("/:id", appointmentController.updateAppointment);
//delete
router.delete("/:id", appointmentController.deleteAppointment);

export default router;
