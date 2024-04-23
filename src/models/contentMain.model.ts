// imports
import { model, Schema } from "mongoose";
import IcontentMain from "../interfaces/contentMain.interface";

// define schema
const ContentMainSchema = new Schema<IcontentMain>(
  {
    contenido1: {
      type: String,
    },
    contenido2: {
      type: String,
    },
    // email: {
    //   type: String,
    //   unique: true,
    //   required: [true, "El email es obligatorio y único"],
    //   lowercase: true,
    //   trim: true,
    // },
    // password: {
    //   type: String,
    //   required: [true, "La contraseña es obligatoria"],
    //   select: false,
    // },
    // rol: {
    //   type: String,
    //   lowercase: true,
    //   default: "paciente",
    //   enum: ["psicologo", "paciente"],
    // },
    // imagenUrl: {
    //   type: String,
    //   required: false,
    // },
  },
  {
    // timestamps: { createdAt: true, updatedAt: true },
  }
);

export default model<IcontentMain>("ContentMain", ContentMainSchema);
