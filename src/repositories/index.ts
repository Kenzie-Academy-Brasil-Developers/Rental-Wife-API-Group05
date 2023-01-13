import { AppDataSource } from "../data-source";
import { Proposals } from "../entities/proposal.entity";
import { Rating } from "../entities/rating.entity";

export const proposalRepository = AppDataSource.getRepository(Proposals);
export const ratingRepository = AppDataSource.getRepository(Rating);
