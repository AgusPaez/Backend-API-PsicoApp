// imports
import { Router } from "express";
import * as appointmentController from "../controllers/appointment.controller";

const router = Router();

// get all
router.get("/findAll", appointmentController.findAll);
// create
router.post("/", appointmentController.createAppointment);
//update
router.patch("/:id", appointmentController.updateAppointment);
//delete
router.delete("/:id", appointmentController.deleteAppointment);
//get user (email)
router.get("/email/:email", appointmentController.findAppointmentsByEmail);
//get reserved dates
router.get(
  "/reserved-dates-times",
  appointmentController.getReservedDatesAndTimes
);

export default router;
