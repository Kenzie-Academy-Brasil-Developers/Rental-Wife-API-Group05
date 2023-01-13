import { updateUserShape } from "../../../serializers/users.schema";
import { IUpdateUser } from "../../../interface/users.interface";
import { UserHired } from "../../../entities/userHired.entity";
import { Services } from "../../../entities/services.entity";
import { AppDataSource } from "../../../data-source";
import { Request } from 'express'
import { AppError } from "../../../errors";

const userHiredRepo = AppDataSource.getRepository(UserHired);
const serviceRepo = AppDataSource.getRepository(Services);

export const updateUserHiredService = async (    req: Request  ): Promise<IUpdateUser> => {   
    const updatedUser = userHiredRepo.create({ ...req.user, ...req.body });
    const newResult = await userHiredRepo.save(updatedUser);
    return await updateUserShape.validate(newResult, {
      stripUnknown: true,
    });
};
