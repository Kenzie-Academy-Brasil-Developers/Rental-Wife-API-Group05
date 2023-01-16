import { proposalRepository, ratingRepository } from "../../repositories";
import { IProposal } from "./../../interface/proposals.interface";
import { proposalResponseShape } from "../../serializers/proposals.schema";
import { IRating } from "./../../interface/users.interface";
import { AppError } from "../../errors";

export const patchProposalEmployerService = async (
  proposal: IProposal,
  rating?: IRating
): Promise<IProposal> => {
  if (proposal.status !== "Em andamento") {
    throw new AppError("Missing hired permission", 401);
  }

  const ratingCreated = ratingRepository.create(rating);
  await ratingRepository.save(ratingCreated);

  const ratingObj = rating.recommendation
    ? { note: rating.note, recommendation: rating.recommendation }
    : { note: rating.note, recommendation: "" };

  const proposalPatch = {
    ...proposal,
    employer: proposal.employer,
    hired: proposal.hired,
    status: "Concluída",
    rating: ratingObj,
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
