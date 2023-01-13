import { UserHired } from "./../../entities/userHired.entity";
import { IEmployer } from "./../../interface/users.interface";
import { AppDataSource } from "../../data-source";
import { proposalResponseShape } from "../../serializers/proposals.schema";
import {
  IProposal,
  IProposalPostRequest,
} from "./../../interface/proposals.interface";
import { proposalRepository } from "../../repositories";

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
    abortEarly: false,
  });

  return verifiedResponseProposal;
};
