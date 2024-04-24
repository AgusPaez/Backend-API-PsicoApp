//imports
import { model, Schema } from "mongoose";
import IcontentStudies from "../interfaces/contentStudies.interface";
import { NextFunction } from "express";

//define interface
const contentStudiesSchema = new Schema<IcontentStudies>(
  {
    titulo: { type: String },
    institucion: { type: String },
    anio: { type: Number },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);
export default model<IcontentStudies>("ContentStudies", contentStudiesSchema);
