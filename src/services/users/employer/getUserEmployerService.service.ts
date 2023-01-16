import { userEmployerRepo } from "../../../repositories"

export const getUserEmployerService = async (userId: string) => {
    return await userEmployerRepo.findOne({
        where: {
            id: userId
        }, 
        relations: {
            address: true
        }
    })
}
