import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { DeleteResult } from "typeorm";
import { AppError } from "../../errors";

export const deleteProposalService = async (
  proposalId: string,
  isHired: boolean
): Promise<DeleteResult> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  if (isHired === true) {
    throw new AppError("Missing permissions.", 403);
  }

  return await proposalRepository.softDelete(proposalId);
};
