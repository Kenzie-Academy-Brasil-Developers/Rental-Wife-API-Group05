import { IRequestUpdateAddress, IResponseUpdateAddress } from "../../../interface/users.interface";
import { updateAddressResponseShape } from "../../../serializers/users.schema";
import { Address } from "../../../entities/address.entity";
import { AppDataSource } from "../../../data-source";

const addressRepo = AppDataSource.getRepository(Address);

export const updateAddressUserService = async (
    body: IRequestUpdateAddress,
    userId: string
  ): Promise<IResponseUpdateAddress> => {
    const updateAddress = addressRepo.create({ ...body, id: userId });
    const newResult = await addressRepo.save(updateAddress);
    return await updateAddressResponseShape.validate(newResult, {
      stripUnknown: true,
    });
};
