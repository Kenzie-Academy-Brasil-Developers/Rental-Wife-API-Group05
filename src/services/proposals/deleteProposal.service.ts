import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { DeleteResult } from "typeorm";
import { AppError } from "../../errors";
import { IProposal } from "../../interface/proposals.interface";

export const deleteProposalService = async (
  proposal: IProposal
): Promise<DeleteResult> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  if (proposal.status !== "Rejeitada") {
    throw new AppError("Missing permissions.", 403);
  }

  return await proposalRepository.softDelete(proposal.id);
};
