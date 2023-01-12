import {
  deleteProposalController,
  getProposalController,
  getProposalsController,
  getProposalsEmployerController,
  getProposalsHiredController,
  patchProposalEmployerController,
  patchProposalHiredController,
  postProposalController,
} from "./../controllers/proposals.controller";
import { Router } from "express";

export const proposalsRouter = Router();

proposalsRouter.get("", getProposalsController);

proposalsRouter.get("/:id", getProposalController);

proposalsRouter.post("/hired/:id", postProposalController);

//

proposalsRouter.get("/hired", getProposalsHiredController);

proposalsRouter.get("/hired/:id", getProposalsHiredController);

proposalsRouter.patch("/hired/:id", patchProposalHiredController);

//

proposalsRouter.get("/employers", getProposalsEmployerController);

proposalsRouter.get("/employers/:id", getProposalsEmployerController);

proposalsRouter.patch("/employers/:id", patchProposalEmployerController);

//

proposalsRouter.delete("/:id", deleteProposalController);
