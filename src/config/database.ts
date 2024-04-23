// Imports
import mongoose from "mongoose";
import dotenv from "dotenv";

// Carga las configuraciones del archivo .env
dotenv.config();

export const configure = async () => {
  const conn = mongoose.connect;

  try {
    // Obtiene la URI de la base de datos del archivo .env
    const dbUri = process.env.MONGO_URI;
    if (!dbUri) {
      throw new Error("No database URI found in environment variables");
    }

    // Conexión a la base de datos MongoDB usando la URI
    await conn(dbUri);
    console.log("✅ Connected to the database");
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
  }
};
