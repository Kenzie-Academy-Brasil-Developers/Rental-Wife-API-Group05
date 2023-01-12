export interface IRegisterRequest {
   email: string;
  password: string;
  avatar_img: string;
  name: string;
  is_hired: boolean;
}  

export interface ILoginRequest {
   email: string;
   password: string;
 }