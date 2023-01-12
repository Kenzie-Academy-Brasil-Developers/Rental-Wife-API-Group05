import { IUser } from "./users.interface";

export interface IProposalRquest {
   userId: number,
   is_active: string,
   title: string,
   description: string,
   user: IUser
}
