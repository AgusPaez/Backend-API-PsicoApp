// imports
import { Document } from "mongoose";

// define interface

interface Iappointment extends Document {
  nombre: string;
  apellido: string;
  edad: number;
  motivo_consulta: string;
  derivacion?: string;
  numero: number;
  email?: string;
  fecha_consulta: Date;
  detalle_consulta: string;
  estado_consulta: string;
}

export default Iappointment;
