import { AppDataSource } from "../../../data-source";
import { UserHired } from "../../../entities/userHired.entity";

const userHiredRepo = AppDataSource.getRepository(UserHired);

export const getHiredUserService = async (
    userId: string
  ): Promise<UserHired> => {
    return await userHiredRepo.findOneBy({ id: userId });
};
