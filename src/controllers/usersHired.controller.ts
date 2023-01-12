import {
    updateAddressUserHiredService,
    deleteUserHiredService,
    updateUserHiredService,
    getAllHiredUsersService,
    getHiredUserService,
} from "../services/users/usersHired.service";
import { Request, Response } from "express";

export const getAllHiredUsers = async (req:Request, res:Response) => {
    const data = await getAllHiredUsersService();
    return res.status(200).json(data);    
};

export const getHiredUser = async (req:Request, res:Response) => {
    const data = await getHiredUserService(req.params.id);
    return res.status(200).json(data);
};

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
    await deleteUserHiredService(req.user.id);
    return res.status(204).json({});
};