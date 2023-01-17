import { updateUserResponseShape } from "../../../serializers/users.schema";
import {
  IUpdateResponseUser,
  IUpdateUser,
} from "../../../interface/users.interface";
import { Request } from "express";
import { userEmployerRepo } from "../../../repositories";

export const updateUserEmployerService = async (
  req: Request
): Promise<IUpdateResponseUser> => {
  const updatedUser = userEmployerRepo.create({ ...req.user, ...req.body });
  const newResult = await userEmployerRepo.save(updatedUser);
  return await updateUserResponseShape.validate(newResult, {
    stripUnknown: true,
  });
};
