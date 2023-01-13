import { DeleteResult } from "typeorm";
import { AppError } from "../../errors";
import { IProposal } from "../../interface/proposals.interface";
import { proposalRepository } from "../../repositories";

export const deleteProposalService = async (
  proposal: IProposal
): Promise<DeleteResult> => {
  if (proposal.status !== "Rejeitada") {
    throw new AppError("Missing permissions.", 403);
  }

  return await proposalRepository.softDelete(proposal.id);
};
