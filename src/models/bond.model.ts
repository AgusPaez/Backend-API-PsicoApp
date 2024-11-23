// imports
import { model, Schema } from "mongoose";
import Ibond from "../interfaces/bond.interface";
//define schema
const AppointmentSchema = new Schema<Ibond>({
  id_vinculo: {
    type: Number,
  },

  nombre_vinculo: {
    type: String,
    required: [true, "el nombre_vinculo es obligatorio"],
  },

  tipo: {
    type: String,
    enum: ["no tiene", "pareja", "familia"],
  },
  titular: {
    type: String,
    required: [true, "el campo titular es obligatorio"],
  },
  pareja: {
    type: String,
  },
  hijo_1: {
    type: String,
  },
  hijo_2: {
    type: String,
  },
  hijo_3: {
    type: String,
  },
  hijo_4: {
    type: String,
  },
  hijo_5: {
    type: String,
  },
});

export default model<Ibond>("Bond", AppointmentSchema);
