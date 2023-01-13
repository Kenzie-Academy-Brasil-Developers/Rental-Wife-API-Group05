import { AppDataSource } from "../../data-source";
import { Admin } from "../../entities/admin.entity";
import { AppError } from "../../errors";
import { IAdminPostRequest } from "../../interface/admin.interface";

export const postAdminService = async (
  userData: IAdminPostRequest
): Promise<Admin> => {
  const userRepository = AppDataSource.getRepository(Admin);

  let user = await userRepository.findOneBy({ email: userData.email });

  if (user) {
    throw new AppError("User alredy exist!", 409);
  }

  user = userRepository.create(userData);
  await userRepository.save(user);

  return user;
};
