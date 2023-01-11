import { UserEmployer } from "./../../entities/userEmployer.entity";
import { IUser } from "./../../interface/users.interface";
import { DeleteResult, UpdateResult } from "typeorm";
import { AppDataSource } from "./../../data-source";

const userEmployer = AppDataSource.getRepository(UserEmployer);

const updateUserService = async (
    body: IUser,
    userId: string
): Promise<UpdateResult> => {
    return await userEmployer.update(userId, body);
};

const deleteUserService = async (userId: string): Promise<DeleteResult> => {
    return await userEmployer.softDelete(userId);
};

export { updateUserService, deleteUserService };
