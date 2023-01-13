import {
  updateAddressUserService,
  deleteUserEmployerService,
  updateUserEmployerService,
} from "../services/users/employer/users.service";
import { Request, Response } from "express";

export const getEmployerUserController = async (
  req: Request,
  res: Response
) => {
  return res.status(200).json(req.user);
};

export const updateEmployerUserController = async (
  req: Request,
  res: Response
) => {
  const data = await updateUserEmployerService(req);
  return res.status(200).json(data);
};

export const updateAddressUserController = async (
  req: Request,
  res: Response
) => {
  const data = await updateAddressUserService(req.body, req.params.id);
  return res.status(200).json(data);
};

export const deleteEmployerUserController = async (
  req: Request,
  res: Response
) => {
  await deleteUserEmployerService(req.params.id);
  return res.status(204).json({});
};
