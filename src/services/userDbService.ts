// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

import { UserConstraintSchema } from "../models/userModel";

// Global Variables
export const collections: {  
  users?: mongoDB.Collection | any;
} = {};

// Initialize Connection
export async function connectToDatabase2() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    `${process.env.DB1_CONN_STRING}`
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB1_NAME);

  //await db.command(UserConstraintSchema);

  // await db.command({
  //   collMod: process.env.USER_COLLECTION_NAME,
  //   validator: {
  //     $jsonSchema: {
  //       bsonType: "object",
  //       required: [
  //         "user_name",
  //         "user_age",
  //         "user_firstname",
  //         "user_lastname",
  //         "user_email",
  //         "user_sex",
  //         "user_address",
  //         "user_telephone",
  //         "user_password",
  //       ],
  //       additionalProperties: false,
  //       properties: {
  //         _id: {},
  //         user_name: {
  //           bsonType: "string",
  //           description: "'user_name' is required and is a string",
  //         },
  //         user_age: {
  //           bsonType: "number",
  //           description: "'user_age' is required and is a number",
  //         },
  //         user_firstname: {
  //           bsonType: "string",
  //           description: "'user_firstname' is required and is a string",
  //         },
  //         user_lastname: {
  //           bsonType: "string",
  //           description: "'user_lastname' is required and is a string",
  //         },
  //         user_sex: {
  //           bsonType: "string",
  //           description: "'user_sex' is required and is a string",
  //         },
  //         user_address: {
  //           bsonType: "string",
  //           description: "'user_address' is required and is a string",
  //         },
  //         user_email: {
  //           bsonType: "string",            
  //           description: "'user_email' is required and is a string",
  //         },
  //         user_telephone: {
  //           bsonType: "string",
  //           description: "'user_telephone' is required and is a string",
  //         },
  //         user_password: {
  //           bsonType: "string",
  //           description: "'user_password' is required and is a string",
  //         },
  //       },
  //     },
  //   },
  // });


  const userCollection: mongoDB.Collection = db.collection(
    `${process.env.USER_COLLECTION_NAME}`
  );

 
  collections.users = userCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} 
    and collection: ${userCollection.collectionName}`
  );
}
