import { IUpdateAddress, IUpdateUser } from "../interface/users.interface";
import { SchemaOf } from "yup";
import * as yup from "yup";

export const updateUserShape: SchemaOf<IUpdateUser> = yup.object().shape({
    name: yup.string(),
    email: yup.string(),
    password: yup.string(),
    avatar_img: yup.string(),
    gender: yup.string().nullable(true),
});

export const updateAddressShape: SchemaOf<IUpdateAddress> = yup.object().shape({
    id: yup.string(),
    street: yup.string(),
    zipCode: yup.string(),
    number: yup.string(),
    city: yup.string(),
    state: yup.string(),
});
