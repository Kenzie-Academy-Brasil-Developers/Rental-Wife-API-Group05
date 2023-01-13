import { Router } from "express";
import { registerUserController } from "../controllers/register.controller";
import {
  validateSchemaMiddleware,
  verifyEmailExistsMiddleware,
} from "../middlewares";

export const registerRouter = Router();

registerRouter.post(
  "",
  validateSchemaMiddleware, //FAZER O SCHEMA
  verifyEmailExistsMiddleware,
  registerUserController
);
