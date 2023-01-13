import { IEmployer, IRating } from "./users.interface";
export interface IProposalPostRequest {
  title: string;
  description: string;
  status: string;
}

export interface IProposalPatchRequest {
  status: string;
  rating?: IRating;
}

export interface IProposalResponse extends IProposalPostRequest {
  employer: IEmployer;
  hired: IEmployer;
}
