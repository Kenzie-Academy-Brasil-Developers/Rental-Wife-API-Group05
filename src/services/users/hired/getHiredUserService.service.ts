import { UserHired } from "../../../entities/userHired.entity";
import { userHiredRepo } from "../../../repositories";

export const getHiredUserService = async (
    userId: string
  ): Promise<UserHired> => {
    return await userHiredRepo.findOneBy({ id: userId });
};
