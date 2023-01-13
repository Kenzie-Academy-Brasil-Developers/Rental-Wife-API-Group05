import { proposalRepository } from "../../repositories";
import { proposalResponseShape } from "../../serializers/proposals.schema";
import { IProposal } from "./../../interface/proposals.interface";

export const getProposalService = async (
  proposal: IProposal
): Promise<IProposal> => {
  const proposalSaved = await proposalRepository.findOne({
    where: { id: proposal.id },
    relations: { employer: true, hired: true },
  });

  const verifiedResponseProposal = await proposalResponseShape.validate(
    proposalSaved,
    {
      stripUnknown: true,
    }
  );

  return verifiedResponseProposal;
};
