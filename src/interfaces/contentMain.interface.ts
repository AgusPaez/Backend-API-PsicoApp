// imports
import { Document } from "mongoose";

// define interface
interface IcontentMain extends Document {
  contenido1: string;
  contenido2: string;
  //   email: string;
  //   password: string;
  //   rol: string;
  //   imagenUrl?: string;
}

export default IcontentMain;
