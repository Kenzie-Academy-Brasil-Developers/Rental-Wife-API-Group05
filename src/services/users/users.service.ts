import { IRequestUpdateUser, IResponseUpdateUser } from "./../../interface/users.interface";
import { updateUserResponseShape } from "../../serializers/users.schema";
import { UserEmployer } from "./../../entities/userEmployer.entity";
import { AppDataSource } from "./../../data-source";
import { DeleteResult } from "typeorm";

const userEmployer = AppDataSource.getRepository(UserEmployer);

const updateUserService = async ( body: IRequestUpdateUser, userId: string ): Promise<IResponseUpdateUser> => {
    const updatedUser = userEmployer.create({ ...body, id: userId });
    await userEmployer.save(updatedUser);
    return await updateUserResponseShape.validate(updatedUser, {
        stripUnknown: true,
    });
};

const deleteUserService = async (userId: string): Promise<DeleteResult> => {
    return await userEmployer.softDelete(userId);
};

export { updateUserService, deleteUserService };
