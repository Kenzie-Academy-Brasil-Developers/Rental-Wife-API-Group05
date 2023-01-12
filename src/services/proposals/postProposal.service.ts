import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { proposalResponseShape } from "../../serializers/proposals.schema";
import {
  IProposalPostRequest,
  IProposalResponse,
} from "./../../interface/proposals.interface";

export const postProposalService = async (
  data: IProposalPostRequest
): Promise<IProposalResponse> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  const proposalCreate = {
    ...data,
  };

  const proposal = proposalRepository.create(proposalCreate);
  await proposalRepository.save(proposal);

  const verifiedResponseProposal = proposalResponseShape.validate(proposal, {
    stripUnknown: true,
  });
  return verifiedResponseProposal;
};
