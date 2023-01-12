import { IEmployer } from "./users.interface";
export interface IProposalPostRequest {
  title: string;
  description: string;
  status: string;
}

export interface IProposalPatchRequest {
  status?: string;
}

export interface IProposalResponse extends IProposalPostRequest {
  employer: IEmployer;
  hired: IEmployer;
}
