import { Request, Response } from "express";
import { ISessionRequest } from "../interface/session.interface";
import { loginService } from "../services/session/session.service";

export const loginController = async (req: Request, res: Response) => {
  const loginData: ISessionRequest = req.body;
  const token = await loginService(loginData);

  return res.status(200).json({ token });
};
