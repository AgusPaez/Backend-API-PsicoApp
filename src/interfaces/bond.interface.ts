// imports
import { Document } from "mongoose";

// define interface
interface Ibond extends Document {
  id_vinculo: number;
  nombre_vinculo: string;
  tipo: string;
  pareja: string;
  hijo_1?: string;
  hijo_2?: string;
  hijo_3?: string;
  hijo_4?: string;
  hijo_5?: string;
}

export default Ibond;
