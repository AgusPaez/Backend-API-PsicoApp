//imports
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import IUser from "../interfaces/user.interface";
import jwt from "jsonwebtoken"; //importamos

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //recibimos de la request una interfaz
    const { nombre, apellido, email, password, rol, imagenUrl } = req.body;
    let user: IUser = new User({
      nombre,
      apellido,
      email,
      password,
      rol,
      imagenUrl,
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
