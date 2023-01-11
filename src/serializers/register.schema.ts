import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserWithoutPass } from "../interface/users.interface";

// export const createUserShape: SchemaOf<"interface-aqui"> = yup.object().shape({

// });

export const returnCreateUserSerializer: SchemaOf<IUserWithoutPass> = yup
  .object()
  .shape({
    id: yup.string(),
    name: yup.string(),
    email: yup.string().email(),
  });
