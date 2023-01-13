import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { proposalResponseShape } from "../../serializers/proposals.schema";
import {
  IProposal,
  IProposalResponse,
} from "./../../interface/proposals.interface";

export const getProposalService = async (
  proposal: IProposal
): Promise<IProposalResponse> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  const proposalSaved = await proposalRepository.findOneBy({ id: proposal.id });

  const verifiedResponseProposal = proposalResponseShape.validate(
    proposalSaved,
    {
      stripUnknown: true,
    }
  );
  return verifiedResponseProposal;
};
