// imports
import appointmentModel from "../models/appointment.model";

export const findAllAppointment = async () => {
  try {
    const appointment = await appointmentModel.find();
    return appointment;
  } catch (error) {
    throw new Error("Error al obtener los estudios");
  }
};
