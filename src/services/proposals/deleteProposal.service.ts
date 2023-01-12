import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";

export const deleteProposalService = async (
  proposalId: string
): Promise<void> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  const proposal = await proposalRepository.findOneBy({ id: proposalId });
};
