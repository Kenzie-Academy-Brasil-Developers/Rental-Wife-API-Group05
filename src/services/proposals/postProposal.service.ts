import { proposalRepository } from "../../repositories";
import {
  IProposal,
  IProposalPostRequest,
} from "./../../interface/proposals.interface";
import { proposalResponseShape } from "../../serializers/proposals.schema";
import { IEmployer } from "./../../interface/users.interface";
import { UserHired } from "./../../entities/userHired.entity";
import { AppDataSource } from "../../data-source";

export const postProposalService = async (
  data: IProposalPostRequest,
  employer: IEmployer,
  hiredId: string
): Promise<IProposal> => {
  const hiredRepository = AppDataSource.getRepository(UserHired);

  const hiredUser = await hiredRepository.findOneBy({
    id: hiredId,
  });

  const proposalCreate = {
    ...data,
    employer: employer,
    hired: hiredUser,
    status: "Enviada",
  };

  const proposal = proposalRepository.create(proposalCreate);
  await proposalRepository.save(proposal);

  const verifiedResponseProposal = proposalResponseShape.validate(proposal, {
    stripUnknown: true,
  });

  return verifiedResponseProposal;
};
