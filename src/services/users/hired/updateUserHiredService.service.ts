import { updateUserResponseShape } from "../../../serializers/users.schema";
import { IResponseUpdateUser } from "../../../interface/users.interface";
import { UserHired } from "../../../entities/userHired.entity";
import { Services } from "../../../entities/services.entity";
import { AppDataSource } from "../../../data-source";
import { Request } from 'express'
import { AppError } from "../../../errors";

const userHiredRepo = AppDataSource.getRepository(UserHired);
const serviceRepo = AppDataSource.getRepository(Services);

export const updateUserHiredService = async (
    req: Request,
    serviceId: string
  ): Promise<IResponseUpdateUser> => {
    const existService = await serviceRepo.findOneBy({ id: serviceId })
    if (!existService) {
      throw new AppError('Service not exist', 404)
    }
    const updatedUser = userHiredRepo.create({ ...req.user, ...req.body });
    const newResult = await userHiredRepo.save(updatedUser);
    return await updateUserResponseShape.validate(newResult, {
      stripUnknown: true,
    });
};
