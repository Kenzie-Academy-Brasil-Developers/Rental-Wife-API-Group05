import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { proposalsResponseShapes } from "./../../serializers/proposals.schema";
import { IProposalResponse } from "../../interface/proposals.interface";

export const getProposalsEmployerService = async (
  employerId: string
): Promise<IProposalResponse[]> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  const proposals = await proposalRepository.find({
    where: { employer: { id: employerId } },
    relations: { employer: true },
  });

  const verifiedResponseProposal = proposalsResponseShapes.validate(proposals, {
    stripUnknown: true,
  });
  return verifiedResponseProposal;
};
