import { Router } from "express";
import {
  getAllAdminController,
  postAdminController,
  sessionAdminController,
} from "../controllers/admin.controller";

export const adminRoutes = Router();

adminRoutes.post("", postAdminController);
adminRoutes.post("", sessionAdminController);
adminRoutes.get("", getAllAdminController);
