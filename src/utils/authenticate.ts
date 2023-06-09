import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { lowerCase } from "lodash";

export const Authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.headers.authorization;

    if (!token) {
      return res.status(401).send("no token");
    }
    const decoded = jwt.verify(token, `process.env.JWT_SECRET`);
    console.log("decoded : ", decoded);

    // let { user_email }:any = decoded;
    // console.log("user_email : ", user_email);

    next();
  } catch (error) {
    return res.sendStatus(403);
  }
  //   try {
  //     const user = req.body as User;
  //     if (!req.headers["authorization"]) return res.sendStatus(401);
  //     const token = req.headers["authorization"].replace("Bearer ", "");

  //     jwt.verify(token, `process.env.ACCESS_TOKEN_SECRET_KEY`, (err, decoded) => {
  //       if (err) throw new Error();

  //       //   user = decoded
  //       //   user.token = token
  //       //   delete user.exp
  //       //   delete user.iat
  //     });
  //     next();
  //   } catch (error) {
  //     return res.sendStatus(403);
  //   }
};
