import { proposalRepository } from "../../repositories";
import { IProposal } from "../../interface/proposals.interface";
import { AppError } from "../../errors";

export const deleteProposalService = async (
  proposal: IProposal
): Promise<void> => {
  if (proposal.status !== "Rejeitada") {
    throw new AppError("Missing permissions.", 403);
  }

  await proposalRepository.softDelete(proposal.id);
};
