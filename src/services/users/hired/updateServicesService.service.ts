import { AppDataSource } from "../../../data-source";
import { Services } from "../../../entities/services.entity";
import { IRequestUpdateService } from "../../../interface/users.interface";

const servicesRepo = AppDataSource.getRepository(Services);

export const updateServicesService = async (
    body: IRequestUpdateService,
    userId: string
  ): Promise<Services> => {
    const updateServices = servicesRepo.create({ ...body, id: userId });
    return await servicesRepo.save(updateServices);
};
