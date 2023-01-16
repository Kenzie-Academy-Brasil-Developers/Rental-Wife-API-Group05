import { AppDataSource } from "../../../data-source";
import { Address } from "../../../entities/address.entity";
import {
  IRequestUpdateAddress,
  IResponseUpdateAddress,
} from "../../../interface/users.interface";
import { updateAddressResponseShape } from "../../../serializers/users.schema";

const addressRepo = AppDataSource.getRepository(Address);

export const updateAddressUserHiredService = async (
  body: IRequestUpdateAddress,
  userId: string
): Promise<IResponseUpdateAddress> => {
  const updateAddress = addressRepo.create({ ...body, id: userId });
  const newAddress = await addressRepo.save(updateAddress);
  return await updateAddressResponseShape.validate(newAddress, {
    stripUnknown: true,
  });
};
