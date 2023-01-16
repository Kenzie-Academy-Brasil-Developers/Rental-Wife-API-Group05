import { addressRepo, userHiredRepo } from "../../../repositories";
import { Request } from "express";

export const updateAddressUserHiredService = async (req: Request) => {
    const userFound = await userHiredRepo.findOneBy({ id: req.user.id });    
    // !Resolver tipagem
    let entityAddress: any;

    if (userFound.address) {
      entityAddress = addressRepo.create({ ...req.body, id: userFound.address.id });
    }
    else {
      entityAddress = addressRepo.create(req.body);
    }
    //!Resolver tipagem
    const updateAddress: any = await addressRepo.save(entityAddress);
    const addr = await addressRepo.findOneBy({ id: updateAddress.id });
    await userHiredRepo.update({ id: req.user.id }, { address: addr });
    return updateAddress;
};
