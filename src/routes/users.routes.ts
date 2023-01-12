import { deleteEmployerUser, updateAddressUser, updateEmployerUser } from "../controllers/users.controller";
import { Router } from "express";

export const usersRouter = Router();

usersRouter.patch("/employer/:id", updateEmployerUser);
usersRouter.delete("/employer/:id", deleteEmployerUser);
usersRouter.patch("/employer/:id/address", updateAddressUser);
