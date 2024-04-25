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
}

export default Iappointment;
