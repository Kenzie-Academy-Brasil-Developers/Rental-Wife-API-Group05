import { UserHired } from "../../../entities/userHired.entity";
import { AppDataSource } from "../../../data-source";

const userHiredRepo = AppDataSource.getRepository(UserHired);

export const getAllHiredUsersService = async (): Promise<UserHired[]> => {
    return await userHiredRepo.find();
};
