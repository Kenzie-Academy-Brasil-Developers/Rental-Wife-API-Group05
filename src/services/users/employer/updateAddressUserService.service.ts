import { IUpdateAddress } from "../../../interface/users.interface";
import { Address } from "../../../entities/address.entity";
import { AppDataSource } from "../../../data-source";

const addressRepo = AppDataSource.getRepository(Address);

export const updateAddressUserService = async (
    body: IUpdateAddress,
    userId: string
  ) => {
    const updateAddress = addressRepo.create({ ...body, id: userId });
    const newResult = await addressRepo.save(updateAddress);    
};
