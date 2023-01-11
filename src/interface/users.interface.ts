import { Address } from "../entities/address.entity";
import { Proposals } from "../entities/proposal.entity";

export interface IRequestUpdateUser {
    name?: string;
    email?: string;
    password?: string;
    avatar_img?: string;
    gender?: string;
}

export interface IResponseUpdateUser {
    id: string;
    name: string;
    email: string;
    avatar_img: string;
    gender: string;
    is_hired: boolean;
}
