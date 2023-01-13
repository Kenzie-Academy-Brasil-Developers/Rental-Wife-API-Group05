import { proposalsResponseShapes } from "./../../serializers/proposals.schema";
import { IProposal } from "../../interface/proposals.interface";
import { IHired } from "../../interface/users.interface";
import { proposalRepository } from "../../repositories";

export const getProposalsHiredService = async (
  hired: IHired
): Promise<IProposal[]> => {
  const proposals = await proposalRepository.find({
    where: { hired: { id: hired.id } },
    relations: { hired: true, employer: true },
  });

  const verifiedResponseProposal = proposalsResponseShapes.validate(proposals, {
    stripUnknown: true,
  });
  return verifiedResponseProposal;
};
