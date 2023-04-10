import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { ObjectId, Timestamp } from "mongodb";
import { collections } from "../services/dessertDbService";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// GET
export async function getUserAll(req: Request, res: Response) {
  try {
    const users: User[] = (await collections.users
      .find({})
      .toArray()) as User[];

    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function getUserById(req: Request, res: Response) {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const user = (await collections.users.findOne(query)) as User;

    if (user) {
      res.status(200).send(user);
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
}

// POST
export async function createUser(req: Request, res: Response) {
  try {
    const newUser = req.body as User;
    console.log("createUser(req: Request, res: Response) : ", newUser);

    const queryusername = { user_name: newUser.user_name };
    const usernameResult = (await collections.users.findOne(
      queryusername
    )) as User;
    if (usernameResult) {
      return res
        .status(409)
        .send("unprocessable entity ! USERNAME already has been created !");
    }

    const queryuseremail = { user_email: newUser.user_email };
    const useremailResult = (await collections.users.findOne(
      queryuseremail
    )) as User;
    if (useremailResult) {
      return res
        .status(409)
        .send("unprocessable entity ! E-MAIL already has been created !");
    }

    // set user level, date/timestamp and encrypt password
    newUser.user_level = "Level User";
    newUser.user_timeStamp = new Date();
    newUser.user_password = await bcrypt.hash(
      newUser.user_password,
      10
    );//`process.env.BCRYPT_HASH_SALT`

    const result = await collections.users.insertOne(newUser);

    result
      ? res
          .status(201)
          .send(`Successfully created a new user with id ${result.insertedId}`)
      : res.status(500).send("Failed to create a new user.");
  } catch (error: any) {
    console.error(error);
    res.status(400).send(error.message);
  }
}
export async function signinUser(req: Request, res: Response) {
  try {
    const usersignin = req.body as User;
    const query = { user_name: usersignin.user_name };
    const usernameResult = (await collections.users.findOne(query)) as User;

    if (!usernameResult) {
      return res.status(409).send(`USERNAME has not been registered`);
    }

    if (
      await bcrypt.compare(
        usersignin.user_password,
        usernameResult.user_password
      )
    ) {
      const user_id = usernameResult.user_id;
      const user_email = usernameResult.user_email;      
      const user_token = jwt.sign(
        { user_id, user_email },
        `process.env.JWT_SECRET`,
        {
          expiresIn: "30m",
          algorithm: "HS256",
        }
      );
      
      usernameResult.user_token = user_token;      
      res.status(200).send(usernameResult);
    }
    else {
      return res.status(409).send(`USERNAME password is not matched`);
    }
    
    //Create token
    // if (usernameResult) {
    //   const user_id = usernameResult.user_id;
    //   const user_email = usernameResult.user_email;
    //   const user_token = jwt.sign(
    //     { user_id, user_email },
    //     `process.env.JWT_SECRET`,
    //     {
    //       expiresIn: "3m",
    //       algorithm: "HS256",
    //     }
    //   );

    //   usernameResult.user_token = user_token;

    //   res.status(200).send(usernameResult);
    // }
  } catch (error) {
    res
      .status(404)
      .send(
        `Unable to find matching document with user_name: ${req.body.user_name}`
      );
  }
}

// PUT
export async function updateUserById(req: Request, res: Response) {
  const id = req?.params?.id;

  try {
    const updatedUser: User = req.body as User;
    const query = { _id: new ObjectId(id) };

    const result = await collections.users.updateOne(query, {
      $set: updatedUser,
    });

    result
      ? res.status(200).send(`Successfully updated user with id ${id}`)
      : res.status(304).send(`User with id: ${id} not updated`);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
}

// Delete
export async function deleteUserById(req: Request, res: Response) {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.users.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed user with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove user with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`User with id ${id} does not exist`);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
}
