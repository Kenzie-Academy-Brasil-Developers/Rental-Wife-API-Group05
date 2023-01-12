import { Router } from "express";
import {
  deleteServiceController,
  getAllServicesController,
  postServiceController,
} from "../controllers/services.controller";

export const servicesRoutes = Router();

servicesRoutes.post("", postServiceController);
servicesRoutes.get("", getAllServicesController);
servicesRoutes.delete("/:id", deleteServiceController);
