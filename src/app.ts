import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { errorHandler } from "./errors";

export const app = express();

app.use(errorHandler);
