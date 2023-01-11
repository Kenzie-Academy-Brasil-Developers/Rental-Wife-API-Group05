import {
    updateAddressUserHiredService,
    deleteUserHiredService,
    updateUserHiredService,
} from "../services/users/usersHired.service";
import { Request, Response } from "express";

export const updateUserHired = async (req: Request, res: Response) => {
    const data = await updateUserHiredService(req.body, req.params.id);
    return res.status(200).json(data);
};

export const updateAddressUserHired = async (req: Request, res: Response) => {
    const data = await updateAddressUserHiredService(req.body, req.params.id);
    return res.status(200).json(data);
};

export const updateServiceUserHired = async (req: Request, res: Response) => {
    const data = await updateUserHiredService(req.body, req.params.id);
    return res.status(200).json(data);
};

export const deleteUserHired = async (req: Request, res: Response) => {
    await deleteUserHiredService(req.params.id);
    return res.status(204);
};
