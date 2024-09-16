// imports
import { model, Schema } from "mongoose";
import Iappointment from "../interfaces/appointment.interface";
//define schema
const AppointmentSchema = new Schema<Iappointment>({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },
  apellido: {
    type: String,
    required: [true, "el apellido es obligatorio"],
  },
  edad: {
    type: Number,
    required: [true, "el nombre es obligatorio"],
  },
  motivo_consulta: {
    type: String,
    required: [true, "el motivo de la consulta es obligatorio"],
  },
  derivacion: {
    type: String,
  },
  numero: {
    type: Number,
    required: [true, "el numero es obligatorio"],
  },
  email: {
    type: String,
  },
  fecha_consulta: {
    type: Date,
    required: [true, "la fecha de la consulta es obligatoria"],
  },
  detalle_consulta: {
    type: String,
  },
  estado_consulta: {
    type: String,
    enum: ["pendiente", "confirmada", "finalizada", "cancelada", "noAsistida"],
    required: [true, "El estado de la consulta es obligatorio"],
    default: "pendiente",
  },
});

export default model<Iappointment>("Appointment", AppointmentSchema);
