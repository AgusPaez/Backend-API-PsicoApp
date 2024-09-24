//imports
import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
// imports model and interface for users
import User from "../models/user.model";
import IUser from "../interfaces/user.interface";
//import jwt
import jwt from "jsonwebtoken";

// create user
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extracts the necessary data to create
    const {
      nombre,
      apellido,
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
      email,
      password,
      rol,
      imagenUrl,
      numero,
      fecha_nacimiento,
      obra_social,
    });
    //Validacion de lo de arriba
    const passwordSaved = await user.guardarContraseña();

    if (!passwordSaved) {
      res.status(400).json("Password encryption failed");
    }
    await user.save();
    // Devolver datos
    const userData = await User.findById(user._id);
    if (!userData) return res.status(404).json("UserData not found");
    return res.json(userData);
  } catch (err) {
    return next(err);
  }
};
//Login
export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUser = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!user) return res.status(404).json("User Not Found");
    if (!user.password)
      return res.status(401).json("Unauthorized, missing password");

    const correctPassword = await user.validarContraseña(req.body.password);
    if (!correctPassword) return res.status(401).json("Invalid Password");

    // Create a Token
    const token: string = jwt.sign(
      { sub: user._id },
      process.env.JWT_SECRET || "",
      {
        // DEFINIR APARTADOS para mas seguridad
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    const { password, ...data } = user.toJSON();
    return res.header("auth-token", token).json({ ...data, token });
  } catch (error) {
    return next(error);
  }
};
