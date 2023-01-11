import { deleteEmployerUser, updateAddressUser, getEmployersUser, updateEmployerUser } from "../controllers/users.controller";
import { Router } from "express";

export const usersRouter = Router();

usersRouter.get("/employer/hired", getEmployersUser);
usersRouter.patch("/employer/:id", updateEmployerUser);
usersRouter.delete("/employer/:id", deleteEmployerUser);
usersRouter.patch("/employer/:id/address", updateAddressUser);
