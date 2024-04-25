// imports
import { Document } from "mongoose";

// define interface
interface IcontentMain extends Document {
  descripcionAboutMe: string;
  descripcionEstudioAbordaje: string;
  fotoPiscologo: boolean;
  medioPago: boolean;
  contactoMail: string;
  contactoNumero: number;
  objetivo: string;
  contenido1: string;
  contenido2: string;
  //   email: string;
  //   password: string;
  //   rol: string;
  //   imagenUrl?: string;
}

export default IcontentMain;
