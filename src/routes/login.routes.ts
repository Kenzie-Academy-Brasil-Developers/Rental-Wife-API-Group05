import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { validateSchemaMiddleware } from "../middlewares";

export const loginRouter = Router();

loginRouter.post(
  "",
  validateSchemaMiddleware, // FAZER SCHEMA
  loginController
);
