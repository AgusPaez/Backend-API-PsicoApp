// imports
import { Document } from "mongoose";

// define interface
interface IUser extends Document {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: string;
  imagenUrl?: string; //opcional
  numero?: Number;
  fecha_nacimiento: Date;
  obra_social: string;
  validarContraseña(contraseña: string): Promise<boolean>;
  guardarContraseña(): Promise<boolean>;
}

export default IUser;
