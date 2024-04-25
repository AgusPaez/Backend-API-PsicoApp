// imports
import contentStudiesModel from "../models/contentStudies.model";

export const findAllContentStudies = async () => {
  try {
    const contentStudies = await contentStudiesModel.find();
    return contentStudies;
  } catch (error) {
    throw new Error("Error al obtener los estudios");
  }
};
