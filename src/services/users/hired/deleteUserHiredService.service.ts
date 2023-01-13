import { UserHired } from "../../../entities/userHired.entity";
import { AppDataSource } from "../../../data-source";
import { DeleteResult } from "typeorm";

const userHiredRepo = AppDataSource.getRepository(UserHired);

export const deleteUserHiredService = async (
    userId: string
  ): Promise<DeleteResult> => {
    return await userHiredRepo.softDelete(userId);
};
