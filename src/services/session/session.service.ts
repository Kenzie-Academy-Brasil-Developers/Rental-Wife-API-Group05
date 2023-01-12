import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { UserEmployer } from "../../entities/userEmployer.entity";
import { UserHired } from "../../entities/userHired.entity";
import { AppError } from "../../errors";
import { ISessionRequest } from "../../interface/session.interface";
import jwt from "jsonwebtoken";

export const loginService = async ({
  email,
  password,
}: ISessionRequest): Promise<string> => {
  const userERepository = AppDataSource.getRepository(UserEmployer);
  const userHRepository = AppDataSource.getRepository(UserHired);

  const userE = await userERepository.findOneBy({ email: email });
  const userH = await userHRepository.findOneBy({ email: email });

  if (!userE && !userH) {
    throw new AppError("Email or password invalid!", 403);
  }

  let user: UserEmployer | UserHired | string = "";

  if (userE) {
    user = userE;
  } else {
    user = userH;
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Email or password invalid!", 403);
  }

  const token = jwt.sign({}, process.env.SECRET_KEY, {
    subject: user.id,
    expiresIn: "24h",
  });

  return token;
};
