import { Request } from "express";
import { AppDataSource } from "../../../data-source";
import { Address } from "../../../entities/address.entity";
import { UserHired } from "../../../entities/userHired.entity";

export const updateAddressUserHiredService = async (req: Request): Promise<Address> => {
    const addressHiredRepo = AppDataSource.getRepository(Address);
    const userHiredRepo = AppDataSource.getRepository(UserHired);
    const userFound = await userHiredRepo.findOneBy({ id: req.user.id });
    
    let entityAddress = {};

    if (userFound.address) {
        entityAddress = addressHiredRepo.create({ ...req.body, id: userFound.address.id });
    } else {
        entityAddress = addressHiredRepo.create(req.body);
    }
    const updateAddress = await addressHiredRepo.save(entityAddress);
    const addr = await addressHiredRepo.findOneBy({ id: updateAddress.id });
    await userHiredRepo.update({ id: req.user.id }, { address: addr });
    return updateAddress;
};
