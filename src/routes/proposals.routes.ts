import { Router } from "express";

export const proposalsRouter = Router();

proposalsRouter.get("");

proposalsRouter.post("/:id");

proposalsRouter.get("/:id");

proposalsRouter.patch("/:id");

proposalsRouter.delete("/:id");
