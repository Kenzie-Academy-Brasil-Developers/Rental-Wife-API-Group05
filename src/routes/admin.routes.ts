import { Router } from "express";
import {
  getAllAdminController,
  postAdminController,
  sessionAdminController,
} from "../controllers/admin.controller";
import {
  validateSchemaMiddleware,
  verifyAuthMiddleware,
  verifyUserIsAdmMiddleware,
} from "../middlewares";
import { loginShape } from "../serializers/login.schema";
import { createAdminShape } from "../serializers/register.schema";

export const adminRoutes = Router();

adminRoutes.post(
  "",
  validateSchemaMiddleware(createAdminShape),
  postAdminController
);
adminRoutes.post(
  "",
  validateSchemaMiddleware(loginShape),
  sessionAdminController
);
adminRoutes.get(
  "",
  verifyAuthMiddleware,
  verifyUserIsAdmMiddleware,
  getAllAdminController
);
