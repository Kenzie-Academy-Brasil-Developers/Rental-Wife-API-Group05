import { AppDataSource } from "../../data-source";
import { Proposals } from "../../entities/proposal.entity";
import { Rating } from "../../entities/rating.entity";
import { AppError } from "../../errors";
import { proposalResponseShape } from "../../serializers/proposals.schema";
import {
  IProposalResponse,
  IProposalPatchRequest,
  IProposal,
} from "./../../interface/proposals.interface";

export const patchProposalEmployerService = async (
  proposal: IProposal,
  updatedBody: IProposalPatchRequest
): Promise<IProposalResponse> => {
  const proposalRepository = AppDataSource.getRepository(Proposals);
  const ratingRepository = AppDataSource.getRepository(Rating);

  if (proposal.status !== "Em andamento") {
    throw new AppError("Missing hired permission", 401);
  }

  if (updatedBody.hasOwnProperty("rating")) {
    const rating = {
      ...updatedBody.rating,
    };

    const ratingCreated = ratingRepository.create(rating);

    const ratingSave = await ratingRepository.save(ratingCreated);

    const proposalPatch = {
      id: proposal.id,
      status: updatedBody.status,
      rating: {
        ...ratingSave,
      },
    };
    await proposalRepository.save(proposalPatch);

    const verifiedResponseProposal = proposalResponseShape.validate(
      proposalPatch,
      {
        stripUnknown: true,
      }
    );
    return verifiedResponseProposal;
  }

  const proposalPatch = {
    id: proposal.id,
    ...updatedBody,
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
