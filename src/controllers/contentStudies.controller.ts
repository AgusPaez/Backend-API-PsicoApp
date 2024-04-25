//imports
import { Request, Response, NextFunction } from "express";
import * as contentStudiesService from "../services/contentStudiesService";
//imports interface and model for contentStudies
import IcontentStudies from "../interfaces/contentStudies.interface";
import contentStudiesModel from "../models/contentStudies.model";

//get all content for STUDIES PAGE
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // save ContentStudies in "ContentStudies" variable
    const contentStudies = await contentStudiesService.findAllContentStudies();
    // return contentStudies in json
    return res.status(200).json(contentStudies);
  } catch (error) {
    return next(error);
  }
};

//create first and unique contentStudies ?
export const createContentStudies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extracts the necessary data to create
    const { titulo, institucion, anio } = req.body;
    // new instance
    const contentStudies: IcontentStudies = new contentStudiesModel({
      titulo,
      institucion,
      anio,
    });
    // save contentStudies
    await contentStudies.save();
    return res.status(200).json(contentStudies);
  } catch (error) {
    return next(error);
  }
};

// get one studie for ID param

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get ID
    const { id } = req.params;
    // save contentStudies in "contentStudies" variable
    const contentStudies = await contentStudiesModel.findById(id);
    // return studie in json
    res.status(200).json(contentStudies);
  } catch (error) {
    return next(error);
  }
};

// delete studie by ID
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get ID
    const { id } = req.params;
    // save deleted studies
    const studiedeleted = await contentStudiesModel.findByIdAndDelete(id);
    // return deleted studie in json
    return res.status(200).json(studiedeleted);
  } catch (error) {
    return next(error);
  }
};

// update studie
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get ID and the necessary data to update
    const { id } = req.params;
    const { titulo, institucion, anio } = req.body;
    // data assignment if it exists
    const newData = {
      ...(titulo && { titulo }),
      ...(institucion && { institucion }),
      ...(anio && { anio }),
    };
    // update object
    const updateStudie = await contentStudiesModel.findByIdAndUpdate(
      id,
      newData,
      { new: true }
    );
    return res.status(200).json(updateStudie);
  } catch (error) {
    return next(error);
  }
};
