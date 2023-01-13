import {
  deleteEmployerUserController,
  getEmployerUserController,
  updateAddressUserController,
  updateEmployerUserController,
} from "../controllers/users.controller";
import { Router } from "express";
import {
  deleteUserHiredController,
  updateAddressUserHiredController,
  updateUserHiredController,
  updateServiceUserHiredController,
  getAllHiredUsersController,
  getHiredUserController,
} from "../controllers/usersHired.controller";
import {
  verifyAuthMiddleware,
  verifyHiredParamsIdExistsMiddleware,
  verifyIsEmployerMiddleware,
  verifyIsHiredMiddleware,
  validateSchemaMiddleware,
} from "../middlewares";
import { updateAddressResponseShape, updateUserResponseShape } from "../serializers/users.schema";

export const usersRouter = Router();

usersRouter.get("/hired", getAllHiredUsersController);

usersRouter.get(
  "/hired/:id",
  verifyAuthMiddleware, // verificar usuario logado
  verifyHiredParamsIdExistsMiddleware, // verificar se id do parametro é um hired
  verifyIsEmployerMiddleware, // verificar se o usuario logado é um employer
  getHiredUserController
);

usersRouter.patch(
  "/hired",
  validateSchemaMiddleware(updateUserResponseShape), // validateSchema()
  verifyAuthMiddleware, // verificar se o usuario logado
  verifyIsHiredMiddleware, // verificar usuario logado é hired
  updateUserHiredController
);

usersRouter.delete(
  "/hired",
  verifyAuthMiddleware, // verificar se o usuario logado
  verifyIsHiredMiddleware, // verificar usuario logado é hired
  deleteUserHiredController
);

usersRouter.patch(
  "/hired/address",
  validateSchemaMiddleware(updateAddressResponseShape), // validateSchema()
  verifyAuthMiddleware, // verificar se o usuario logado
  verifyIsHiredMiddleware, // verificar usuario logado é hired
  updateAddressUserHiredController
);

usersRouter.patch(
  "/hired/services",
  verifyAuthMiddleware, // verificar se o usuario logado
  verifyIsHiredMiddleware, // verificar usuario logado é hired
  // verificar se o service existe (FAZER DENTRO DO SERVICE)
  updateServiceUserHiredController
);

usersRouter.get(
  "/employer",
  verifyAuthMiddleware, // verificar se o usuario logado
  verifyIsEmployerMiddleware, // verificar usuario logado é employer
  getEmployerUserController
);

usersRouter.patch(
  "/employer",
  validateSchemaMiddleware(updateUserResponseShape), // validateSchema()
  verifyAuthMiddleware, // verificar se o usuario logado
  verifyIsEmployerMiddleware, // verificar usuario logado é employer
  updateEmployerUserController
);

usersRouter.delete(
  "/employer",
  verifyAuthMiddleware, // verificar se o usuario logado
  verifyIsEmployerMiddleware, // verificar usuario logado é employer
  deleteEmployerUserController
);

usersRouter.patch(
  "/employer/address",
  validateSchemaMiddleware(updateAddressResponseShape), // validateSchema()
  verifyAuthMiddleware, // verificar se o usuario logado
  verifyIsEmployerMiddleware, // verificar usuario logado é employer
  updateAddressUserController
);
