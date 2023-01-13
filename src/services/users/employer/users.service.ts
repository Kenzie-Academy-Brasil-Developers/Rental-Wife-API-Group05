import {
  IRequestUpdateAddress,
  IResponseUpdateAddress,
  IResponseUpdateUser,
} from "../../../interface/users.interface";
import {
  updateAddressResponseShape,
  updateUserResponseShape,
} from "../../../serializers/users.schema";
import { UserEmployer } from "../../../entities/userEmployer.entity";
import { Address } from "../../../entities/address.entity";
import { AppDataSource } from "../../../data-source";
import { DeleteResult } from "typeorm";
import { Request } from "express";

const userEmployerRepo = AppDataSource.getRepository(UserEmployer);
const addressRepo = AppDataSource.getRepository(Address);

export const updateUserEmployerService = async (
  req: Request
): Promise<IResponseUpdateUser> => {
  // const userFound = await userEmployerRepo.findOneBy({ id: userId });
  const updatedUser = userEmployerRepo.create({ ...req.user, ...req.body });
  const newResult = await userEmployerRepo.save(updatedUser);
  return await updateUserResponseShape.validate(newResult, {
    stripUnknown: true,
  });
};

export const updateAddressUserService = async (
  body: IRequestUpdateAddress,
  userId: string
): Promise<IResponseUpdateAddress> => {
  const updateAddress = addressRepo.create({ ...body, id: userId });
  const newResult = await addressRepo.save(updateAddress);
  return await updateAddressResponseShape.validate(newResult, {
    stripUnknown: true,
  });
};

export const deleteUserEmployerService = async (
  userId: string
): Promise<DeleteResult> => {
  return await userEmployerRepo.softDelete(userId);
};
