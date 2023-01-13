import { updateUserShape } from "../../../serializers/users.schema";
import { IUpdateUser } from "../../../interface/users.interface";
import { UserEmployer } from "../../../entities/userEmployer.entity";
import { AppDataSource } from "../../../data-source";
import { Request } from 'express'

const userEmployerRepo = AppDataSource.getRepository(UserEmployer);

export const updateUserEmployerService = async (
    req: Request
  ): Promise<IUpdateUser> => {
    const updatedUser = userEmployerRepo.create({ ...req.user, ...req.body });
    const newResult = await userEmployerRepo.save(updatedUser);
    return await updateUserShape.validate(newResult, {
      stripUnknown: true,
    });
};
