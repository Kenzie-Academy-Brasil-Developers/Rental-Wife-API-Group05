import { postProposalService } from "../services/proposals/postProposal.service";
import { Request, Response } from "express";
import { getProposalService } from "../services/proposals/getProposal.service";
import { getProposalsService } from "../services/proposals/getProposals.service";
import { patchProposalService } from "../services/proposals/patchProposal.service";
import { deleteProposalService } from "../services/proposals/deleteProposal.service";

// Todas as propostas -

export const getProposalsController = async (req: Request, res: Response) => {
  const data = await getProposalsService();

  return res.status(200).json(data);
};

// Propostas únicas -

export const postProposalController = async (req: Request, res: Response) => {
  const data = await postProposalService(req.body);

  return res.status(200).json(data);
};

export const getProposalController = async (req: Request, res: Response) => {
  const proposalId = req.params.id;

  const data = await getProposalService(proposalId);

  return res.status(200).json(data);
};

export const patchProposalController = async (req: Request, res: Response) => {
  const proposalId = req.params.id;
  const proposalBodyUpdate = req.body;

  const data = await patchProposalService(proposalId, proposalBodyUpdate);

  return res.status(200).json(data);
};

export const deleteProposalController = async (req: Request, res: Response) => {
  const proposalId = req.params.id;

  const data = await deleteProposalService(proposalId);

  return res.status(200).json(data);
};
