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

const updateUserHiredService = async (body: IRequestUpdateUser, userId: string): Promise<IResponseUpdateUser> => {
    const updatedUser = userHiredRepo.create({ ...body, id: userId });
    await userHiredRepo.save(updatedUser);
    return await updateUserResponseShape.validate(updatedUser, {
        stripUnknown: true,
    });
};

const updateAddressUserHiredService = async (
    body: IRequestUpdateAddress,
    userId: string
): Promise<IResponseUpdateAddress> => {
    const updateAddress = addressRepo.create({ ...body, id: userId });
    await addressRepo.save(updateAddress);
    return await updateAddressResponseShape.validate(updateAddress, {
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

export { updateAddressUserHiredService, updateUserHiredService, updateServicesService, deleteUserHiredService };
