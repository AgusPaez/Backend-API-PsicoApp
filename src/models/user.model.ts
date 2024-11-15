// imports
import { model, Schema } from "mongoose";
import IUser from "../interfaces/user.interface";
import bcrypt from "bcrypt";

// define schema
const UserSchema = new Schema<IUser>(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"], //hacer validaciones con libreria
    },
    apellido: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    dni: {
      type: Number,
      required: [false],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "El email es obligatorio y único"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      //select: false,
    },
    rol: {
      type: String,
      lowercase: true,
      default: "paciente",
      enum: ["psicologo", "paciente"],
    },
    imagenUrl: {
      type: String,
      required: false,
    },
    numero: {
      type: Number,
      required: false,
    },
    fecha_nacimiento: {
      type: Date,
      required: [true, "La fecha de nacimiento es obligatoria"],
    },
    matricula_profesional: {
      type: String,
      required: false,
    },
    obra_social: {
      type: String,
      default: "NO TIENE",
      enum: [
        "NO TIENE",
        "SANCOR",
        "SANCOR SALUD",
        "PROVINCIA",
        "SWISS",
        "OSECAC",
        "JERARQUICOS",
      ],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);
// metodo que nos sirve para guardar la clase de usurio
UserSchema.methods.guardarContraseña =
  async function guardarContraseña(): Promise<boolean> {
    const user = this as any;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return true;
  };
// metodo para validar
UserSchema.methods.validarContraseña = function validarContraseña(
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, (this as any).password);
};

export default model<IUser>("User", UserSchema);
