import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { UserEmployer } from "../entities/userEmployer.entity";
import { AppError } from "../errors";

export const verifyIsEmployerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const employerRepo = AppDataSource.getRepository(UserEmployer);
  const loggedUser = await employerRepo.findOneBy({ id: req.user.id });
  console.log(req.user.id, "Chegou ate aqui");
  if (!loggedUser) {
    throw new AppError("Missing employer permission", 401);
  }
  req.user = loggedUser;

  return next();
};
