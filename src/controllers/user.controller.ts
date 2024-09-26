// imports
import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
// imports model and interface for users
import User from "../models/user.model";
import IUser from "../interfaces/user.interface";
import userModel from "../models/user.model";

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
    const {
      nombre,
      apellido,
      dni,
      email,
      password,
      rol,
      numero,
      fecha_nacimiento,
      obra_social,
    } = req.body;
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
      });
      imagenUrl = result.secure_url;
    }
    // new instance
    const user: IUser = new User({
      nombre,
      apellido,
      dni,
      email,
      password,
      rol,
      imagenUrl,
      numero,
      fecha_nacimiento,
      obra_social,
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
//delete user
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
// update user
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido,
      dni,
      email,
      password,
      rol,
      numero,
      fecha_nacimiento,
      obra_social,
    } = req.body;
    let imagenUrl = "";
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
      console.log(imageBase64);
      imagenUrl = result.secure_url;
      console.log(imagenUrl);
    }
    const newData = {
      ...(nombre && { nombre }),
      ...(apellido && { apellido }),
      ...(dni && { dni }),
      ...(email && { email }),
      ...(password && { password }),
      ...(rol && { rol }),
      ...(imagenUrl && { imagenUrl }),
      ...(numero && { numero }),
      ...(fecha_nacimiento && { fecha_nacimiento }),
      ...(obra_social && { obra_social }),
    };
    const updatedUser = await userModel.findByIdAndUpdate(id, newData, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};
// get user (email)
export const findUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.params;

    // Buscar el usuario por email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
