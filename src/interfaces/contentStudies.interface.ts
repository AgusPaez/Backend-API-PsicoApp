//imports
import { Document } from "mongoose";

//define interface

interface IcontentStudies extends Document {
  titulo: string;
  institucion: string;
  anio: Number;
}

export default IcontentStudies;
