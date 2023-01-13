import { UserHired } from "./../../entities/userHired.entity";
import { IEmployer } from "./../../interface/users.interface";
import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { proposalResponseShape } from "../../serializers/proposals.schema";
import {
  IProposalPostRequest,
  IProposalResponse,
} from "./../../interface/proposals.interface";

export const postProposalService = async (
  data: IProposalPostRequest,
  employer: IEmployer,
  hiredId: string
): Promise<IProposalResponse> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);
  const hiredRepository = AppDataSource.getRepository(UserHired);

  const hiredUser = await hiredRepository.findOneBy({
    id: hiredId,
  });

  const proposalCreate = {
    ...data,
    employer: employer,
    hired: hiredUser,
  };

  const proposal = proposalRepository.create(proposalCreate);
  await proposalRepository.save(proposal);

  const verifiedResponseProposal = proposalResponseShape.validate(proposal, {
    stripUnknown: true,
  });

  return verifiedResponseProposal;
};
