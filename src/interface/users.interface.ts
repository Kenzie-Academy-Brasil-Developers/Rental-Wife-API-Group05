export interface IEmployer {
  id: string;
  name: string;
  email: string;
  avatar_img: string;
  address?: IAdress | null;
}

export interface IUserWithoutPass {
  id: string;
  name: string;
  email: string;
}

export interface IAdress {
  id: string;
  street: string;
  zipCode: string;
  number: string;
  city: string;
  state: string;
}
