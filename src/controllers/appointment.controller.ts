//imports
import { Request, Response, NextFunction } from "express";
//import * as contentStudiesService from "../services/contentStudiesService";
import * as appointmentService from "../services/appointmentService";
//imports interface and model for contentStudies
import Iappointment from "../interfaces/appointment.interface";
import appointmentModel from "../models/appointment.model";

//get all
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // save ContentStudies in "ContentStudies" variable
    const appointment = await appointmentService.findAllAppointment();
    // return contentStudies in json
    return res.status(200).json(appointment);
  } catch (error) {
    return next(error);
  }
};

//create
export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extracts the necessary data to create
    const {
      nombre,
      apellido,
      dni,
      edad,
      motivo_consulta,
      derivacion,
      numero,
      email,
      fecha_consulta,
      detalle_consulta,
      estado_consulta,
    } = req.body;
    // new instance
    const appointment: Iappointment = new appointmentModel({
      nombre,
      apellido,
      dni,
      edad,
      motivo_consulta,
      derivacion,
      numero,
      email,
      fecha_consulta,
      detalle_consulta,
      estado_consulta,
    });
    // save contentStudies
    await appointment.save();
    return res.status(200).json(appointment);
  } catch (error) {
    return next(error);
  }
};

// update
export const updateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extract the id from params and the updated data from the request body
    const { id } = req.params;
    const {
      nombre,
      apellido,
      dni,
      edad,
      motivo_consulta,
      derivacion,
      numero,
      email,
      fecha_consulta,
      detalle_consulta,
      estado_consulta,
    } = req.body;

    // find the appointment by id and update it with new data
    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      id,
      {
        nombre,
        apellido,
        dni,
        edad,
        motivo_consulta,
        derivacion,
        numero,
        email,
        fecha_consulta,
        detalle_consulta,
        estado_consulta,
      },
      { new: true } // option to return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json(updatedAppointment);
  } catch (error) {
    return next(error);
  }
};
// delete
export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extract the id from params
    const { id } = req.params;

    // find the appointment by id and delete it
    const deletedAppointment = await appointmentModel.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res
      .status(200)
      .json({ message: "Appointment deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

// get appointments (email)
export const findAppointmentsByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extract the email from params
    const { email } = req.params;
    // find the appointment by email
    const appointments = await appointmentModel.find({ email });

    // if no appointments are found, return an empty array
    return res.status(200).json(appointments);
  } catch (error) {
    return next(error);
  }
};
// Get reserved appointment
export const getReservedDatesAndTimes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Consultamos todas las citas con fecha y hora de consulta
    const appointments = await appointmentModel.find(
      { fecha_consulta: { $exists: true } },
      { fecha_consulta: 1, _id: 0 }
    );

    // format 'yyyy-mm-dd HH:mm'
    const reservedDatesAndTimes = appointments.map((appointment) => {
      const formattedDate = appointment.fecha_consulta
        .toISOString()
        .replace("T", " ")
        .slice(0, 16); // 'yyyy-mm-dd HH:mm'
      return formattedDate;
    });

    return res.status(200).json(reservedDatesAndTimes); // return date and time
  } catch (error) {
    return next(error);
  }
};
