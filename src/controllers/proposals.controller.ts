import { getProposalsEmployerService } from "./../services/proposals/getProposalsEmployer.service";
import { postProposalService } from "../services/proposals/postProposal.service";
import { Request, Response } from "express";
import { getProposalService } from "../services/proposals/getProposal.service";
import { getProposalsService } from "../services/proposals/getProposals.service";
import { deleteProposalService } from "../services/proposals/deleteProposal.service";
import { getProposalsHiredService } from "../services/proposals/getProposalsHired.service";
import { patchProposalEmployerService } from "../services/proposals/patchProposalEmployer.service";
import { patchProposalHiredService } from "../services/proposals/patchProposalHired.service";

// Todas as propostas e Propostas do usuário-

export const getProposalsController = async (req: Request, res: Response) => {
  const data = await getProposalsService();

  return res.status(200).json(data);
};

export const getProposalsEmployerController = async (
  req: Request,
  res: Response
) => {
  const employerId = req.params.id;

  const data = await getProposalsEmployerService(employerId);

  return res.status(200).json(data);
};

export const getProposalsHiredController = async (
  req: Request,
  res: Response
) => {
  const hiredId = req.params.id;

  const data = await getProposalsHiredService(hiredId);

  return res.status(200).json(data);
};

// Propostas únicas -

export const getProposalController = async (req: Request, res: Response) => {
  const proposalId = req.params.id;

  const data = await getProposalService(proposalId);

  return res.status(200).json(data);
};

//
export const postProposalController = async (req: Request, res: Response) => {
  const data = await postProposalService(req.body);

  return res.status(200).json(data);
};

export const patchProposalEmployerController = async (
  req: Request,
  res: Response
) => {
  const proposalId = req.params.id;
  const proposalBodyUpdate = req.body;

  const data = await patchProposalEmployerService(
    proposalId,
    proposalBodyUpdate
  );

  return res.status(200).json(data);
};

export const patchProposalHiredController = async (
  req: Request,
  res: Response
) => {
  const proposalId = req.params.id;
  const proposalBodyUpdate = req.body;

  const data = await patchProposalHiredService(proposalId, proposalBodyUpdate);

  return res.status(200).json(data);
};

export const deleteProposalController = async (req: Request, res: Response) => {
  const proposalId = req.params.id;
  const isHired = req.user.isHired;

  const data = await deleteProposalService(proposalId, isHired);

  return res.status(200).json(data);
};
