import express, { Router } from "express";

import {
  getUserAll,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  signinUser
} from "../controllers/userController";

import { Authenticate } from "../utils/authenticate";

export const userRouter = Router();

//userRouter.use(express.json());

userRouter.get("/", getUserAll);

userRouter.get("/:id", getUserById);

userRouter.post("/", createUser);

userRouter.post("/signin", signinUser);

userRouter.put("/:id", updateUserById);

userRouter.delete("/:id", deleteUserById);
