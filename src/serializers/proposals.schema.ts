import { IUser } from "./../interface/users.interface";
import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IProposalPatchRequest,
  IProposalPostRequest,
  IProposalResponse,
} from "../interface/proposals.interface";

const SchemaEmployer = {
  name: yup.string().required(),
};

const SchemaHired = {
  name: yup.string().required(),
};

const SchemaRating = {
  name: yup.string().required(),
};

export const createProposalRequestShape: SchemaOf<IProposalPostRequest> = yup
  .object()
  .shape({
    title: yup.string().required(),
    description: yup.string().required(),
    status: yup.string().required(),
  });

export const updateProposalRequestShape: SchemaOf<IProposalPatchRequest> = yup
  .object()
  .shape({
    status: yup.string().required(),

    rating: yup.object().shape(SchemaRating),
  });

export const proposalResponseShape: SchemaOf<IProposalResponse> = yup
  .object()
  .shape({
    title: yup.string(),
    description: yup.string(),
    status: yup.string(),

    rating: yup.object().shape(SchemaRating),

    employer: yup.object().shape(SchemaEmployer),

    hired: yup.object().shape(SchemaHired),
  });

export const proposalsResponseShapes = yup.array(proposalResponseShape);
