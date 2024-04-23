// Imports
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
// Configura multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

dotenv.config();
// cloudinary.config.ts

export const cloudinaryConfig = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("✅ Configurate cloudinary");
  } catch (error) {
    throw new Error("❌ It is not possible to connect to Cloudinary");
  }
};
