import { proposalsResponseShapes } from "./../../serializers/proposals.schema";
import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { IProposalResponse } from "../../interface/proposals.interface";

export const getProposalsService = async (): Promise<IProposalResponse[]> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  const proposals = await proposalRepository.find();

  const verifiedResponse = proposalsResponseShapes.validate(proposals, {
    stripUnknown: true,
  });

  return verifiedResponse;
};
