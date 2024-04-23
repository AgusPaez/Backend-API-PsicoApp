// imports
import { Document } from "mongoose";

// define interface
interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  rol: string;
  imagenUrl?: string; //opcional
  validarContraseña(contraseña: string): Promise<boolean>;
  guardarContraseña(): Promise<boolean>;
}

export default IUser;
