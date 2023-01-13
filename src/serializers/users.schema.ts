import { IResponseUpdateAddress, IResponseUpdateUser } from "../interface/users.interface"
import { SchemaOf } from "yup";
import * as yup from "yup";

export const updateUserResponseShape: SchemaOf<IResponseUpdateUser> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required(),
    avatar_img: yup.string().required(),
    gender: yup.string().required(),
    is_hired: yup.boolean().required(),
});

export const updateAddressResponseShape: SchemaOf<IResponseUpdateAddress> = yup.object().shape({
    id: yup.string().required(),
    street: yup.string().required(),
    zipCode: yup.string().required(),
    number: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required()
});
