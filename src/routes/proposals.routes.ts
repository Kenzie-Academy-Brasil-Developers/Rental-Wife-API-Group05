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
import {
  validateSchemaMiddleware,
  verifyAuthMiddleware,
  verifyHiredParamsIdExistsMiddleware,
  verifyIsEmployerMiddleware,
  verifyIsHiredMiddleware,
  verifyProposalsExistsMiddleware,
  verifyUserIsAdmMiddleware,
} from "../middlewares";
import { updateProposalRequestShape } from "../serializers/proposals.schema";
import { verifyEmployerParamsIdExistsMiddleware } from "../middlewares/verifyEmployerParamsIdExists.middleware";

export const proposalsRouter = Router();

proposalsRouter.get("", verifyUserIsAdmMiddleware, getProposalsController);

proposalsRouter.get(
  "/:id",
  verifyAuthMiddleware,
  verifyProposalsExistsMiddleware,
  getProposalController
);

proposalsRouter.post(
  "/hired/:id",
  verifyAuthMiddleware,
  verifyHiredParamsIdExistsMiddleware,
  verifyIsEmployerMiddleware,
  postProposalController
);

//

proposalsRouter.get(
  "/hired",
  verifyAuthMiddleware,
  verifyIsHiredMiddleware,
  getProposalsHiredController
);

proposalsRouter.get(
  "/hired/:id",
  verifyAuthMiddleware,
  verifyHiredParamsIdExistsMiddleware,
  verifyIsEmployerMiddleware,
  getProposalsHiredController
);

proposalsRouter.patch(
  ":id/hired/",
  validateSchemaMiddleware(updateProposalRequestShape),
  verifyAuthMiddleware,
  verifyProposalsExistsMiddleware,
  verifyIsHiredMiddleware,
  patchProposalHiredController
);

//

proposalsRouter.get(
  "/employers",
  verifyAuthMiddleware,
  verifyIsEmployerMiddleware,
  getProposalsEmployerController
);

proposalsRouter.get(
  "/employers/:id",
  verifyAuthMiddleware,
  verifyIsEmployerMiddleware,
  verifyEmployerParamsIdExistsMiddleware,
  getProposalsEmployerController
);

proposalsRouter.patch(
  ":id/employers/",
  validateSchemaMiddleware(updateProposalRequestShape),
  verifyAuthMiddleware,
  verifyProposalsExistsMiddleware,
  verifyIsEmployerMiddleware,
  patchProposalEmployerController
);

//

proposalsRouter.delete(
  "/:id",
  verifyAuthMiddleware,
  verifyProposalsExistsMiddleware,
  verifyIsEmployerMiddleware,
  deleteProposalController
);
