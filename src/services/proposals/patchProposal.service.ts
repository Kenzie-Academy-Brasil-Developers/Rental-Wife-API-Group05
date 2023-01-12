import {
  IProposalResponse,
  IProposalPatchRequest,
} from "./../../interface/proposals.interface";
import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { proposalResponseShape } from "../../serializers/proposals.schema";

export const patchProposalService = async (
  proposalId: string,
  updatedBody: IProposalPatchRequest
): Promise<IProposalResponse> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  const proposalUpdate = {
    id: proposalId,
    ...updatedBody,
  };

  await proposalRepository.save(proposalUpdate);

  const verifiedResponseProposal = proposalResponseShape.validate(
    proposalUpdate,
    {
      stripUnknown: true,
    }
  );

  return verifiedResponseProposal;
};
