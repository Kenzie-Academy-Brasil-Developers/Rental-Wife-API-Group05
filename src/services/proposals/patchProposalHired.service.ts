import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { proposalResponseShape } from "../../serializers/proposals.schema";
import {
  IProposalResponse,
  IProposalPatchRequest,
} from "./../../interface/proposals.interface";

export const patchProposalHiredService = async (
  proposalId: string,
  updatedBody: IProposalPatchRequest
): Promise<IProposalResponse> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  const proposalPatch = {
    id: proposalId,
    ...updatedBody,
  };

  await proposalRepository.save(proposalPatch);

  const verifiedResponseProposal = proposalResponseShape.validate(
    proposalPatch,
    {
      stripUnknown: true,
    }
  );
  return verifiedResponseProposal;

  // VERIFICAR SE A PROPOSTA FOI ENCERRADA, CASO ESTEJA ENCERRADA, DISPARAR UM ERROR
};
