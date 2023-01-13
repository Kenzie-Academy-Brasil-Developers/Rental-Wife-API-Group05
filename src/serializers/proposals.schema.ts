import { IEmployer } from "./../interface/users.interface";
import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IProposalPatchRequest,
  IProposalPostRequest,
  IProposalResponse,
} from "../interface/proposals.interface";

const SchemaAddress = {
  id: yup.string().required(),
  street: yup.string().required(),
  zipCode: yup.string().required(),
  number: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
};

const SchemaEmployer = {
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  avatar_img: yup.string().required(),

  address: yup.object().shape(SchemaAddress),
};

const SchemaHired = {
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  avatar_img: yup.string().required(),

  address: yup.object().shape(SchemaAddress),
};

const SchemaRating = {
  id: yup.string().notRequired(),
  recomendation: yup.string().required(),
  note: yup.number().required(),
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

    rating: yup.object().shape(SchemaRating).notRequired(),
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
