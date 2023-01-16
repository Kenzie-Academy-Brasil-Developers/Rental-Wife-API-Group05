import { IRequestUpdateService } from "../../../interface/users.interface";
import { Services } from "../../../entities/services.entity";
import { servicesRepo } from "../../../repositories";

export const updateServicesService = async (
    body: IRequestUpdateService,
    userId: string
  ): Promise<Services> => {
    const updateServices = servicesRepo.create({ ...body, id: userId });
    return await servicesRepo.save(updateServices);
};
