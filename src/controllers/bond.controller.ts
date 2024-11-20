// Imports
import { Request, Response, NextFunction } from "express";
import Ibond from "../interfaces/bond.interface";
import bondModel from "../models/bond.model";

// Obtener todos los vínculos
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bonds = await bondModel.find();
    return res.status(200).json(bonds);
  } catch (error) {
    return next(error);
  }
};

// Crear un nuevo vínculo
export const createBond = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      id_vinculo,
      nombre_vinculo,
      tipo,
      titular,
      pareja,
      hijo_1,
      hijo_2,
      hijo_3,
      hijo_4,
      hijo_5,
    } = req.body;

    // Validación básica para el campo "tipo"
    const validTypes = ["no tiene", "pareja", "familia"];
    if (tipo && !validTypes.includes(tipo)) {
      return res
        .status(400)
        .json({ message: `El tipo debe ser uno de: ${validTypes.join(", ")}` });
    }

    const bond: Ibond = new bondModel({
      id_vinculo,
      nombre_vinculo,
      tipo,
      titular,
      pareja,
      hijo_1,
      hijo_2,
      hijo_3,
      hijo_4,
      hijo_5,
    });

    await bond.save();
    return res.status(200).json(bond);
  } catch (error) {
    return next(error);
  }
};

// Obtener un vínculo por ID
export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const bond = await bondModel.findById(id);

    if (!bond) {
      return res.status(404).json({ message: "Vínculo no encontrado" });
    }

    return res.status(200).json(bond);
  } catch (error) {
    return next(error);
  }
};

// Eliminar un vínculo por ID
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const bondDeleted = await bondModel.findByIdAndDelete(id);

    if (!bondDeleted) {
      return res.status(404).json({ message: "Vínculo no encontrado" });
    }

    return res.status(200).json(bondDeleted);
  } catch (error) {
    return next(error);
  }
};

// Actualizar un vínculo
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      id_vinculo,
      nombre_vinculo,
      tipo,
      titular,
      pareja,
      hijo_1,
      hijo_2,
      hijo_3,
      hijo_4,
      hijo_5,
    } = req.body;

    // Validación básica para el campo "tipo"
    const validTypes = ["no tiene", "pareja", "familia"];
    if (tipo && !validTypes.includes(tipo)) {
      return res
        .status(400)
        .json({ message: `El tipo debe ser uno de: ${validTypes.join(", ")}` });
    }

    const newData = {
      ...(id_vinculo && { id_vinculo }),
      ...(nombre_vinculo && { nombre_vinculo }),
      ...(tipo && { tipo }),
      ...(titular && { titular }),
      ...(pareja && { pareja }),
      ...(hijo_1 && { hijo_1 }),
      ...(hijo_2 && { hijo_2 }),
      ...(hijo_3 && { hijo_3 }),
      ...(hijo_4 && { hijo_4 }),
      ...(hijo_5 && { hijo_5 }),
    };

    const updatedBond = await bondModel.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!updatedBond) {
      return res.status(404).json({ message: "Vínculo no encontrado" });
    }

    return res.status(200).json(updatedBond);
  } catch (error) {
    return next(error);
  }
};
