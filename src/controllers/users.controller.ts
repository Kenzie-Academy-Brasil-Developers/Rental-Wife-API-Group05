import {
    deleteUserService,
    updateUserService,
} from "../services/users/users.service";
import { Request, Response } from "express";

export const updateUser = async (req: Request, res: Response) => {
    const data = await updateUserService(req.body, req.params.id);
    return res.status(200).json(data);
};

export const deleteUser = async (req: Request, res: Response) => {
    await deleteUserService(req.params.id);
    return res.status(204);
};
