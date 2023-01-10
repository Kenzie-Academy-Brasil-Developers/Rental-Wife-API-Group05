import "express-async-errors";
import "reflect-metadata";
import express from "express";
import { errorHandler } from "./errors";
// import {
//   loginRouter,
//   proposalsRouter,
//   registerRouter,
//   usersRouter,
// } from "./routes";
import * as router from "./routes";

export const app = express();

app.use(express.json());

// app.use("/users", usersRouter);
// app.use("/login", loginRouter);
// app.use("/register", registerRouter);
// app.use("/proposals", proposalsRouter);

app.use("/users", router.usersRouter);
app.use("/login", router.loginRouter);
app.use("/register", router.registerRouter);
app.use("/proposals", router.proposalsRouter);


app.use(errorHandler);
