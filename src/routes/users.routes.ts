import { deleteEmployerUser, getEmployerUser, updateAddressUser, updateEmployerUser } from "../controllers/users.controller";
import { Router } from "express";
import {
    deleteUserHired,
    updateAddressUserHired,
    updateUserHired,
    updateServiceUserHired,
    getAllHiredUsers,
    getHiredUser,
} from "../controllers/usersHired.controller";

export const usersRouter = Router();

usersRouter.get("/hired", 
    getAllHiredUsers
);

usersRouter.get("/hired/:id", 
    // verificar usuario logado
    // verificar se id do parametro é um hired
    // verificar se o usuario logado é um employer
    getHiredUser
);

usersRouter.patch("/hired", 
    // verificar se o usuario logado
    // verificar usuario logado é hired
    // validateSchema()
    updateUserHired
);

usersRouter.delete("/hired", 
    // verificar se o usuario logado
    // verificar usuario logado é hired
    deleteUserHired
);

usersRouter.patch("/hired/address", 
    // verificar se o usuario logado
    // verificar usuario logado é hired
    // validateSchema()
    updateAddressUserHired
);

usersRouter.patch("/hired/services", 
    // verificar se o usuario logado
    // verificar usuario logado é hired
    // verificar se o service existe 
    updateServiceUserHired
);

usersRouter.get("/employer", 
    // verificar se o usuario logado
    // verificar usuario logado é employer
    getEmployerUser
);

usersRouter.patch("/employer", 
    // verificar se o usuario logado
    // verificar usuario logado é employer
    // validateSchema()
    updateEmployerUser
);

usersRouter.delete("/employer", 
    // verificar se o usuario logado
    // verificar usuario logado é employer
    deleteEmployerUser
);

usersRouter.patch("/employer/address", 
    // verificar se o usuario logado
    // verificar usuario logado é employer
    // validateSchema()
    updateAddressUser
);
