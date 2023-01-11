import { IResponseUpdateUser } from "../interface/users.interface"
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
