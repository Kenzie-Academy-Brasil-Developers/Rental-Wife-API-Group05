import { AppError } from "../../errors";
import { proposalRepository } from "../../repositories";
import { proposalResponseShape } from "../../serializers/proposals.schema";
import { IProposal } from "./../../interface/proposals.interface";

export const patchProposalHiredService = async (
  proposal: IProposal
): Promise<IProposal> => {
  if (proposal.status !== "Enviada") {
    throw new AppError("Missing employer permission", 401);
  }

  const proposalPatch = {
    id: proposal.id,
    status: "Recusada",
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
