import { AppDataSource } from "../../data-source";
import { Admin } from "../../entities/admin.entity";
import { IAdminPostRequest } from "../../interface/admin.interface";

export const postAdminService = async (
  userData: IAdminPostRequest
): Promise<Admin> => {
  const userRepository = AppDataSource.getRepository(Admin);

  const user = userRepository.create(userData);
  await userRepository.save(user);

  return user;
};
