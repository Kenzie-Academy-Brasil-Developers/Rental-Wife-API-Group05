import {
    updateAddressUserService,
    deleteUserEmployerService,
    updateUserEmployerService,
} from "../services/users/users.service";
import { Request, Response } from "express";

export const updateEmployerUser = async (req: Request, res: Response) => {
    const data = await updateUserEmployerService(req.body, req.params.id);
    return res.status(200).json(data);
};

export const updateAddressUser = async (req: Request, res: Response) => {
    const data = await updateAddressUserService(req.body, req.params.id);
    return res.status(200).json(data);
};

export const deleteEmployerUser = async (req: Request, res: Response) => {
    await deleteUserEmployerService(req.params.id);
    return res.status(204);
};
