import { IProposalResponse } from "./../../interface/proposals.interface";
import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { proposalResponseShape } from "../../serializers/proposals.schema";

export const getProposalService = async (
  proposalId: string
): Promise<IProposalResponse> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  const proposal = await proposalRepository.findOneBy({ id: proposalId });

  const verifiedResponseProposal = proposalResponseShape.validate(proposal, {
    stripUnknown: true,
  });

  return verifiedResponseProposal;
};
