import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IProposal,
  IProposalPostRequest,
  IProposalRatingRequest,
  IProposalStatusRequest,
} from "../interface/proposals.interface";

const SchemaProposalsAddress = {
  id: yup.string().required(),
  street: yup.string().required(),
  zipCode: yup.string().required(),
  number: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
};

const SchemaProposalsServices = {
  id: yup.string().required(),
  name: yup.string().required(),
};

const SchemaProposalsEmployer = {
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  avatar_img: yup.string().required(),
  address: yup.object().shape(SchemaProposalsAddress).required(),
};

const SchemaProposalsHired = {
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  avatar_img: yup.string().required(),
  address: yup.object().shape(SchemaProposalsAddress).required(),
  services: yup.array(yup.object().shape(SchemaProposalsServices)).required(),
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
  });

export const updateStatusRequestShape: SchemaOf<IProposalStatusRequest> = yup
  .object()
  .shape({
    status: yup.string().required(),
  });

export const updateRatingRequestShape: SchemaOf<IProposalRatingRequest> = yup
  .object()
  .shape({
    rating: yup.object().shape(SchemaProposalsRating).required(),
  });

export const proposalResponseShape: SchemaOf<IProposal> = yup.object().shape({
  id: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  status: yup.string().required(),
  employer: yup.object().shape(SchemaProposalsEmployer).required(),
  hired: yup.object().shape(SchemaProposalsHired).required(),
  rating: yup.object().shape(SchemaProposalsRating).notRequired(),
});

export const proposalsResponseShapes = yup.array(proposalResponseShape);
