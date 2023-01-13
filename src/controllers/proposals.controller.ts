import { getProposalsEmployerService } from "./../services/proposals/getProposalsEmployer.service";
import { postProposalService } from "../services/proposals/postProposal.service";
import { Request, Response } from "express";
import { getProposalService } from "../services/proposals/getProposal.service";
import { getProposalsService } from "../services/proposals/getProposals.service";
import { deleteProposalService } from "../services/proposals/deleteProposal.service";
import { getProposalsHiredService } from "../services/proposals/getProposalsHired.service";
import { patchProposalEmployerService } from "../services/proposals/patchProposalEmployer.service";
import { patchProposalHiredService } from "../services/proposals/patchProposalHired.service";
import { IProposal } from "../interface/proposals.interface";

// Todas as propostas e Propostas do usuário-

export const getProposalsController = async (req: Request, res: Response) => {
  const data = await getProposalsService();

  return res.status(200).json(data);
};

export const getProposalsEmployerController = async (
  req: Request,
  res: Response
) => {
  const data = await getProposalsEmployerService(req.user);

  return res.status(200).json(data);
};

export const getProposalsHiredController = async (
  req: Request,
  res: Response
) => {
  const data = await getProposalsHiredService(req.user);

  return res.status(200).json(data);
};

// Propostas únicas -

export const getProposalController = async (req: Request, res: Response) => {
  const proposal = req.proposal;

  const data = await getProposalService(proposal);

  return res.status(200).json(data);
};

//
export const postProposalController = async (req: Request, res: Response) => {
  const data = await postProposalService(req.body, req.user, req.params.id);

  return res.status(200).json(data);
};

export const patchProposalEmployerController = async (
  req: Request,
  res: Response
) => {
  const proposal = req.proposal;
  const proposalBodyUpdate = req.body;

  const data = await patchProposalEmployerService(proposal, proposalBodyUpdate);

  return res.status(200).json(data);
};

export const patchProposalHiredController = async (
  req: Request,
  res: Response
) => {
  const proposal = req.proposal;
  const proposalBodyUpdate = req.body;

  const data = await patchProposalHiredService(proposal, proposalBodyUpdate);

  return res.status(200).json(data);
};

export const deleteProposalController = async (req: Request, res: Response) => {
  const proposal: IProposal = req.proposal;

  const data = await deleteProposalService(proposal);

  return res.status(200).json(data);
};
