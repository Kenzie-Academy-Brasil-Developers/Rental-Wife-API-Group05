import {
    deleteUserHired,
    updateAddressUserHired,
    updateUserHired,
    updateServiceUserHired,
    getAllHiredUsers,
    getHiredUser,
} from "../controllers/usersHired.controller";
import { Router } from "express";

export const usersRouter = Router();

usersRouter.get("/hired", getAllHiredUsers);
usersRouter.get("/hired/:id", getHiredUser);
usersRouter.patch("/hired/:id", updateUserHired);
usersRouter.delete("/hired/:id", deleteUserHired);
usersRouter.patch("/hired/:id/address", updateAddressUserHired);
usersRouter.patch("/hired/:id/services", updateServiceUserHired);
