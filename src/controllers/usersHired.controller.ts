import {
  updateAddressUserHiredService,
  deleteUserHiredService,
  updateUserHiredService,
  getAllHiredUsersService,
  getHiredUserService,
} from "../services/users/hired/usersHired.service";
import { Request, Response } from "express";

export const getAllHiredUsersController = async (
  req: Request,
  res: Response
) => {
  const data = await getAllHiredUsersService();
  return res.status(200).json(data);
};

export const getHiredUserController = async (req: Request, res: Response) => {
  const data = await getHiredUserService(req.params.id);
  return res.status(200).json(data);
};

export const updateUserHiredController = async (
  req: Request,
  res: Response
) => {
  const data = await updateUserHiredService(req);
  return res.status(200).json(data);
};

export const updateAddressUserHiredController = async (
  req: Request,
  res: Response
) => {
  const data = await updateAddressUserHiredService(req.body, req.params.id);
  return res.status(200).json(data);
};

export const updateServiceUserHiredController = async (
  req: Request,
  res: Response
) => {
  const data = await updateUserHiredService(req.body);
  return res.status(200).json(data);
};

export const deleteUserHiredController = async (
  req: Request,
  res: Response
) => {
  await deleteUserHiredService(req.user.id);
  return res.status(204).json({});
};
