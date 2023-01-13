import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { AppError } from "../../errors";
import { proposalResponseShape } from "../../serializers/proposals.schema";
import {
  IProposalResponse,
  IProposalPatchRequest,
  IProposal,
} from "./../../interface/proposals.interface";

export const patchProposalHiredService = async (
  proposal: IProposal,
  updatedBody: IProposalPatchRequest
): Promise<IProposalResponse> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);

  if (proposal.status !== "Enviada") {
    throw new AppError("Missing employer permission", 401);
  }

  const proposalPatch = {
    id: proposal.id,
    status: updatedBody.status,
  };

  await proposalRepository.save(proposalPatch);

  const verifiedResponseProposal = proposalResponseShape.validate(
    proposalPatch,
    {
      stripUnknown: true,
    }
  );
  return verifiedResponseProposal;
};

// VERIFICAR SE A PROPOSTA FOI ENCERRADA, CASO ESTEJA ENCERRADA, DISPARAR UM ERROR

// Status = ["Enviada", "Rejeitada", "Em andamento", "Concluída"];
