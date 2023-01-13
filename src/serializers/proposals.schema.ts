import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IProposal,
  IProposalPatchRequest,
  IProposalPostRequest,
  IProposalResponse,
} from "../interface/proposals.interface";

const SchemaProposalsServices = {
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
};

const SchemaProposalsAddress = {
  id: yup.string().notRequired(),
  street: yup.string().notRequired(),
  zipCode: yup.string().notRequired(),
  number: yup.string().notRequired(),
  city: yup.string().notRequired(),
  state: yup.string().notRequired(),
};

const SchemaProposalsEmployer = {
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  avatar_img: yup.string().required(),

  address: yup.object().shape(SchemaProposalsAddress),
};

const SchemaProposalsHired = {
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  avatar_img: yup.string().required(),

  address: yup.object().shape(SchemaProposalsAddress),

  services: yup.object().shape(SchemaProposalsServices).notRequired(),
};

const SchemaProposalsRating = {
  id: yup.string().notRequired(),
  recommendation: yup.string().notRequired(),
  note: yup.number().notRequired(),
};

export const createProposalRequestShape: SchemaOf<IProposalPostRequest> = yup
  .object()
  .shape({
    title: yup.string().required(),
    description: yup.string().required(),
    status: yup.string().required(),

    rating: yup.object().shape(SchemaProposalsRating),
  });

export const updateProposalRequestShape: SchemaOf<IProposalPatchRequest> = yup
  .object()
  .shape({
    status: yup.string().required(),

    rating: yup.object().shape(SchemaProposalsRating).notRequired(),
  });

export const proposalResponseShape: SchemaOf<IProposal> = yup.object().shape({
  id: yup.string(),
  title: yup.string(),
  description: yup.string(),
  status: yup.string(),

  employer: yup.object().shape(SchemaProposalsEmployer).required(),

  hired: yup.object().shape(SchemaProposalsHired).required(),

  rating: yup.object().shape(SchemaProposalsRating).notRequired(),
});

export const proposalsResponseShapes = yup.array(proposalResponseShape);
