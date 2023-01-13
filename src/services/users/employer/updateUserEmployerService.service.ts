import { updateUserResponseShape } from "../../../serializers/users.schema";
import { IResponseUpdateUser } from "../../../interface/users.interface";
import { UserEmployer } from "../../../entities/userEmployer.entity";
import { AppDataSource } from "../../../data-source";
import { Request } from 'express'

const userEmployerRepo = AppDataSource.getRepository(UserEmployer);

export const updateUserEmployerService = async (
    req: Request
  ): Promise<IResponseUpdateUser> => {
    const updatedUser = userEmployerRepo.create({ ...req.user, ...req.body });
    const newResult = await userEmployerRepo.save(updatedUser);
    return await updateUserResponseShape.validate(newResult, {
      stripUnknown: true,
    });
};
