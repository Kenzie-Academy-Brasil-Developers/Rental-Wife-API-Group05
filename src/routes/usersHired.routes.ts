import {
    deleteUserHired,
    updateAddressUserHired,
    updateUserHired,
    updateServiceUserHired,
} from "../controllers/usersHired.controller";
import { Router } from "express";

export const usersRouter = Router();

usersRouter.patch("/hired/:id", updateUserHired);
usersRouter.delete("/hired/:id", deleteUserHired);
usersRouter.patch("/hired/:id/address", updateAddressUserHired);
usersRouter.patch("/hired/:id/services", updateServiceUserHired);
