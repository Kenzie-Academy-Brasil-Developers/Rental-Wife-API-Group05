import { IRegisterRequest } from "../../../interface";

export const mockedEmployerRegister: IRegisterRequest = {   
  name: "name",   
  email: "email@mail.com",   
  password: "123456",   
  avatar_img: "link",   
  is_hired: false, 
};  

export const mockedHiredRegister: IRegisterRequest = {   
  name: "hired",   
  email: "emailHired@mail.com",   
  password: "123456",   
  avatar_img: "link",   
  is_hired: true, 
};

export const mockedAlreadyRegister: IRegisterRequest = {
  name: "name",
  email: "email@mail.com",
  password: "123456",
  avatar_img: "link",
  is_hired: true,
};

export const mockedEmployer2Register: IRegisterRequest = {   
  name: "hired2",   
  email: "email2Employer@mail.com",   
  password: "123456",   
  avatar_img: "link",   
  is_hired: false, 
};

export const mockedHired2Register: IRegisterRequest = {   
  name: "hired2",   
  email: "email2Hired@mail.com",   
  password: "123456",   
  avatar_img: "link",   
  is_hired: false, 
};
