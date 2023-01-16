import { IUpdateAddress } from "../../../interface/users.interface";
import { addressRepo, userEmployerRepo } from "../../../repositories";
import { Request } from "express"; 

export const updateAddressUserService = async (
    req:Request
  ) => {
    const userFound = await userEmployerRepo.findOneBy({ id: req.user.id });    
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
    await userEmployerRepo.update({ id: req.user.id }, { address: addr });
    
    return await userEmployerRepo.findOne({
      where: {
        id: req.user.id,
      },
      relations: {
        address: true
      }
    })
};
