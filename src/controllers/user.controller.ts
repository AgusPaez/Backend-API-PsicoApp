// imports
import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
// imports model and interface for users
import User from "../models/user.model";
import IUser from "../interfaces/user.interface";

// get all users
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // save users in "users" variable
    const users = await User.find(); //ver mas opciones de find y de mongo
    //return users in json
    return res.status(200).json(users); //manejar mas errores
  } catch (error) {
    return next(error);
  }
};

// create user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extracts the necessary data to create
    const { nombre, email, password, rol } = req.body;
    let imagenUrl = "";
    // if a file is uploaded
    if (req.file) {
      // get file type and data in buffer
      const imageBase64 = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
      // upload image in base64 to cloudinary
      const result = await cloudinary.uploader.upload(imageBase64, {
        // image size limit
        width: 500,
        height: 500,
      });
      imagenUrl = result.secure_url;
    }
    // new instance
    const user: IUser = new User({
      nombre,
      email,
      password,
      rol,
      imagenUrl,
    });
    // save user
    await user.save();
    // return new user in json
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
// get one user for ID param
export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get ID
    const { id } = req.params;
    // save user in "user" variable
    const user = await User.findById(id);
    // return user in json
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get ID
    const { id } = req.params;
    // save user in "user" variable
    const user = await User.findById(id);

    if (!user) return res.status(404).json("No existe");
    // delete user
    await user.deleteOne();
    // show deleted user in json
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
