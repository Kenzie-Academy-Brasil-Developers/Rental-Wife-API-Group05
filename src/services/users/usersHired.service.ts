import {
    IRequestUpdateAddress,
    IRequestUpdateService,
    IRequestUpdateUser,
    IResponseUpdateAddress,
    IResponseUpdateUser,
} from "../../interface/users.interface";
import { updateAddressResponseShape, updateUserResponseShape } from "../../serializers/users.schema";
import { UserHired } from "../../entities/userHired.entity";
import { Address } from "../../entities/address.entity";
import { Services } from "../../entities/services.entity";
import { AppDataSource } from "../../data-source";
import { DeleteResult } from "typeorm";

const userHiredRepo = AppDataSource.getRepository(UserHired);
const addressRepo = AppDataSource.getRepository(Address);
const ServicesRepo = AppDataSource.getRepository(Services);

const getHiredUserService = async (userId: string): Promise<UserHired> => {
    return await userHiredRepo.findOneBy({ id: userId });
};

const getAllHiredUsersService = async (): Promise<UserHired[]> => {
    return await userHiredRepo.find();
};

const updateUserHiredService = async (body: IRequestUpdateUser, userId: string): Promise<IResponseUpdateUser> => {
    const userFound = await userHiredRepo.findOneBy({ id: userId });
    const updatedUser = userHiredRepo.create({ ...userFound, ...body });
    const newResult = await userHiredRepo.save(updatedUser);
    return await updateUserResponseShape.validate(newResult, {
        stripUnknown: true,
    });
};

const updateAddressUserHiredService = async (
    body: IRequestUpdateAddress,
    userId: string
): Promise<IResponseUpdateAddress> => {
    const updateAddress = addressRepo.create({ ...body, id: userId });
    const newAddress = await addressRepo.save(updateAddress);
    return await updateAddressResponseShape.validate(newAddress, {
        stripUnknown: true,
    });
};

const updateServicesService = async (body: IRequestUpdateService, userId: string):Promise<Services> => {
    const updateServices = ServicesRepo.create({ ...body, id: userId });
    return await addressRepo.save(updateServices);
};

const deleteUserHiredService = async (userId: string): Promise<DeleteResult> => {
    return await userHiredRepo.softDelete(userId);
};

export { getHiredUserService, getAllHiredUsersService, updateAddressUserHiredService, updateUserHiredService, updateServicesService, deleteUserHiredService };