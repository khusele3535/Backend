import { Router } from "express";
import { getUsers, getUser, createUser } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUser);
usersRouter.post("/", createUser);

export default usersRouter;
