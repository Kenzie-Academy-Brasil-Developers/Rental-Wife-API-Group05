import { Address } from "../entities/address.entity";
import { Proposals } from "../entities/proposal.entity";

export interface IUser {
    id: string;
    name: string;
    email: string;
    is_hired: boolean;
    avatar_img: string;
    gender: string;
    location: string;
    proposals: Proposals[];
    address: Address;
    password: string;
}
