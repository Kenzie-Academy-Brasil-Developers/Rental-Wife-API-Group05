import { IRegisterRequest } from "../../../interface";

export const mockedEmployerRegister: IRegisterRequest = {
    name: "name",
    email: "email@mail.com",
    password: "123456",
    avatar_img: "link",
    is_hired: false,
  };
  
  export const mockedHiredRegister: IRegisterRequest = {
    name: "name",
    email: "email@mail.com",
    password: "123456",
    avatar_img: "link",
    is_hired: true,
  };