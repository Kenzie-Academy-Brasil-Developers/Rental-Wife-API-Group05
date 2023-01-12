import { ILoginRequest } from "../../../interface/session.interface";

export const mockedLogin: ILoginRequest = {
  email: "email@mail.com",
  password: "123456",
};

export const mockedWrongLogin: ILoginRequest = {
  email: "email@mail.com",
  password: "teste123",
};

export const mockedUserNotExistsLogin: ILoginRequest = {
  email: "email@mail.com",
  password: "teste123",
};
