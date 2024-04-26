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
      edad,
      motivo_consulta,
      derivacion,
      numero,
      email,
    } = req.body;
    // new instance
    const appointment: Iappointment = new appointmentModel({
      nombre,
      apellido,
      edad,
      motivo_consulta,
      derivacion,
      numero,
      email,
    });
    // save contentStudies
    await appointment.save();
    return res.status(200).json(appointment);
  } catch (error) {
    return next(error);
  }
};
