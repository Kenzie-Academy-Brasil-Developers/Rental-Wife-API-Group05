import { Router } from "express";
import { registerUserController } from "../controllers/register.controller";

export const registerRouter = Router();

registerRouter.post("", registerUserController);
