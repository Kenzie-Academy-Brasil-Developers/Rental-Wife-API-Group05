import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { DeleteResult } from "typeorm";

export const deleteProposalService = async (
  proposalId: string
): Promise<DeleteResult> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  return await proposalRepository.softDelete(proposalId);
};
