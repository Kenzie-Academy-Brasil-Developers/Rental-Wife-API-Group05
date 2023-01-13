import { IEmployer } from "./../../interface/users.interface";
import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { proposalsResponseShapes } from "./../../serializers/proposals.schema";
import { IProposalResponse } from "../../interface/proposals.interface";

export const getProposalsEmployerService = async (
  employer: IEmployer
): Promise<IProposalResponse[]> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  const proposals = await proposalRepository.find({
    where: { employer: { id: employer.id } },
    relations: { employer: true },
  });

  const verifiedResponseProposal = proposalsResponseShapes.validate(proposals, {
    stripUnknown: true,
  });
  return verifiedResponseProposal;
};
