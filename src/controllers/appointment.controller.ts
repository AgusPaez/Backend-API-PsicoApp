//imports
import { Request, Response, NextFunction } from "express";
import moment from "moment-timezone";
import { encryptData } from "../utils/encryption.util";
import { decryptData } from "../utils/encryption.util";
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
    const appointments = await appointmentService.findAllAppointment();

    const decryptedAppointments = appointments.map((appointment) => ({
      ...appointment.toObject(),
      motivo_consulta: decryptData(appointment.motivo_consulta),
      detalle_consulta: appointment.detalle_consulta
        ? decryptData(appointment.detalle_consulta)
        : "",
    }));

    return res.status(200).json(decryptedAppointments);
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

    // Ajustar la fecha a UTC-3 (Argentina)
    const adjustedDate = moment.tz(
      fecha_consulta,
      "America/Argentina/San_Juan"
    );

    // Crear una nueva instancia del modelo con los datos cifrados
    const appointment: Iappointment = new appointmentModel({
      nombre,
      apellido,
      dni,
      edad,
      motivo_consulta: encryptData(motivo_consulta),
      derivacion,
      numero,
      email,
      fecha_consulta: adjustedDate,
      detalle_consulta: detalle_consulta ? encryptData(detalle_consulta) : "",
      estado_consulta,
    });

    // Guardar la cita
    const savedAppointment = await appointment.save();
    // Desencriptar los campos antes de devolverlos
    const decryptedAppointment = {
      ...savedAppointment.toObject(),
      motivo_consulta: decryptData(savedAppointment.motivo_consulta),
      detalle_consulta: savedAppointment.detalle_consulta
        ? decryptData(savedAppointment.detalle_consulta)
        : "",
    };

    return res.status(200).json(decryptedAppointment);
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

    // Cifrar los campos que necesitan cifrado
    const updatedData = {
      nombre,
      apellido,
      dni,
      edad,
      motivo_consulta: encryptData(motivo_consulta),
      derivacion,
      numero,
      email,
      fecha_consulta,
      detalle_consulta: detalle_consulta ? encryptData(detalle_consulta) : "",
      estado_consulta,
    };

    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
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
    const { email } = req.params;
    const appointments = await appointmentModel.find({ email });

    const decryptedAppointments = appointments.map((appointment) => ({
      ...appointment.toObject(),
      motivo_consulta: decryptData(appointment.motivo_consulta),
      detalle_consulta: appointment.detalle_consulta
        ? decryptData(appointment.detalle_consulta)
        : "",
    }));

    return res.status(200).json(decryptedAppointments);
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
