import { Request } from "express";
import { AppDataSource } from "../../../data-source";
import { Address } from "../../../entities/address.entity";
import { UserHired } from "../../../entities/userHired.entity";
import { IAddress, IUpdateAddress } from "../../../interface/users.interface";

export const updateAddressUserHiredService = async (req: Request) => {
    const addressHiredRepo = AppDataSource.getRepository(Address);
    const userHiredRepo = AppDataSource.getRepository(UserHired);
    const userFound = await userHiredRepo.findOneBy({ id: req.user.id });    
    // !Resolver tipagem
    let entityAddress: any;

    if (userFound.address) entityAddress = addressHiredRepo.create({ ...req.body, id: userFound.address.id });
    else entityAddress = addressHiredRepo.create(req.body);
  //!Resolver tipagem
    const updateAddress: any = await addressHiredRepo.save(entityAddress);
    const addr = await addressHiredRepo.findOneBy({ id: updateAddress.id });
    await userHiredRepo.update({ id: req.user.id }, { address: addr });
    return updateAddress;
};
