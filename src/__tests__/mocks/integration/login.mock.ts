import { ILoginRequest } from "../../../interface";

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

export const mockedUserLoginHired: ILoginRequest = {
  email: "emailHired@mail.com",   
  password: "123456"
}

export const mockedLoginEmployer2: ILoginRequest = {
 email: "email2Employer@mail.com",
 password: "123456",
};

export const mockedLoginHired2: ILoginRequest = {
 email: "email2Hired@mail.com",
 password: "123456",
};

