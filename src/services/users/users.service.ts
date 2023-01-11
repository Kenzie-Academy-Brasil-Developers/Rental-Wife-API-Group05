import { IRequestUpdateAddress, IRequestUpdateUser, IResponseUpdateAddress, IResponseUpdateUser } from "./../../interface/users.interface";
import { updateAddressResponseShape, updateUserResponseShape } from "../../serializers/users.schema";
import { UserEmployer } from "./../../entities/userEmployer.entity";
import { UserHired } from "../../entities/userHired.entity";
import { Address } from "../../entities/address.entity";
import { AppDataSource } from "./../../data-source";
import { DeleteResult } from "typeorm";

const userEmployerRepo = AppDataSource.getRepository(UserEmployer);
const userHiredRepo = AppDataSource.getRepository(UserHired);
const addressRepo = AppDataSource.getRepository(Address);

const getEmployersUserService = async (): Promise<UserHired[]> => {
    return await userHiredRepo.find()
};

const updateUserEmployerService = async (body: IRequestUpdateUser, userId: string): Promise<IResponseUpdateUser> => {
    const updatedUser = userEmployerRepo.create({ ...body, id: userId });
    await userEmployerRepo.save(updatedUser);
    return await updateUserResponseShape.validate(updatedUser, {
        stripUnknown: true,
    });
};

const updateAddressUserService = async (body: IRequestUpdateAddress, userId: string): Promise<IResponseUpdateAddress> => {
    const updateAddress = addressRepo.create({ ...body, id: userId });
    await addressRepo.save(updateAddress);
    return await updateAddressResponseShape.validate(updateAddress, {
        stripUnknown: true
    });
};

const deleteUserEmployerService = async (userId: string): Promise<DeleteResult> => {
    return await userEmployerRepo.softDelete(userId);
};

export { updateAddressUserService, getEmployersUserService, updateUserEmployerService, deleteUserEmployerService };
