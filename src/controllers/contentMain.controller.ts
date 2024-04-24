// imports
import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
// imports model and interface for Content Main
import ContentMain from "../models/contentMain.model";
import IcontentMain from "../interfaces/contentMain.interface";

// import User from "../models/user.model";
// import IUser from "../interfaces/user.interface";

// get all content for MAIN PAGE
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // save ContentMain in "contentMain" variable
    const contentMain = await ContentMain.find(); //ver mas opciones de find y de mongo
    //return contentMain in json
    return res.status(200).json(contentMain); //manejar mas errores
  } catch (error) {
    return next(error);
  }
};

//create first and unique contentMain ?
export const createContentMain = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extracts the necessary data to create
    const { contenido1, contenido2 } = req.body;
    let imagenUrl = "";
    // if a file is uploaded
    if (req.file) {
      // get file type and data in buffer
      // const imageBase64 = `data:${
      //   req.file.mimetype
      // };base64,${req.file.buffer.toString("base64")}`;
      // // upload image in base64 to cloudinary
      // const result = await cloudinary.uploader.upload(imageBase64, {
      // image size limit
      //   width: 500,
      //   height: 500,
      // });
      // imagenUrl = result.secure_url;
    }
    // new instance
    const contentMain: IcontentMain = new ContentMain({
      contenido1,
      contenido2,
      // imagenUrl,
    });
    // save contentMain
    await contentMain.save();
    // return new contentMain in json ¡?
    return res.status(200).json(contentMain);
  } catch (error) {
    return next(error);
  }
};
// get one contentMain for ID param
export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get ID
    const { id } = req.params;
    // save ContentMain in "contentMain" variable
    const contentMain = await ContentMain.findById(id);
    // return user in json
    return res.status(200).json(contentMain);
  } catch (error) {
    return next(error);
  }
};
// destroy ? delete ? contentMain
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get ID
    const { id } = req.params;
    // save ContentMain in "contentMain" variable
    const contentMain = await ContentMain.findById(id);

    if (!contentMain) return res.status(404).json("No existe");
    // delete contentMain
    await contentMain.deleteOne();
    // show deleted contentMain in json
    return res.status(200).json(contentMain);
  } catch (error) {
    return next(error);
  }
};
