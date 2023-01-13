import { proposalsResponseShapes } from "./../../serializers/proposals.schema";
import { IProposal } from "../../interface/proposals.interface";
import { proposalRepository } from "../../repositories";

export const getProposalsService = async (): Promise<IProposal[]> => {
  const proposals = await proposalRepository.find({
    relations: { employer: true, hired: true },
  });

  const verifiedResponseProposal = proposalsResponseShapes.validate(proposals, {
    stripUnknown: true,
  });
  return verifiedResponseProposal;
};
