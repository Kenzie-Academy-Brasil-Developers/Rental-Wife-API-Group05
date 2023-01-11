import { deleteUser, updateUser } from "../controllers/users.controller";
import { Router } from "express";

export const usersRouter = Router();

usersRouter.patch("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);
