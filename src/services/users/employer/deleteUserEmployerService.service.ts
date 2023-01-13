import { UserEmployer } from "../../../entities/userEmployer.entity";
import { AppDataSource } from "../../../data-source";
import { DeleteResult } from "typeorm";

const userEmployerRepo = AppDataSource.getRepository(UserEmployer);

export const deleteUserEmployerService = async (
    userId: string
  ): Promise<DeleteResult> => {
    return await userEmployerRepo.softDelete(userId);
};
