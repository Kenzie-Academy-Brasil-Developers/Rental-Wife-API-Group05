import { IEmployer } from "./../../interface/users.interface";
import { proposalsResponseShapes } from "./../../serializers/proposals.schema";
import { IProposal } from "../../interface/proposals.interface";
import { proposalRepository } from "../../repositories";

export const getProposalsEmployerService = async (
  employer: IEmployer
): Promise<IProposal[]> => {
  const proposals = await proposalRepository.find({
    where: { employer: { id: employer.id } },
    relations: { employer: true, hired: true },
  });

  const verifiedResponseProposal = proposalsResponseShapes.validate(proposals, {
    stripUnknown: true,
  });

  return verifiedResponseProposal;
};
