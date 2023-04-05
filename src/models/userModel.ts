// External dependencies
import { ObjectId, Timestamp } from "mongodb";
import { z } from "zod"

// Class Implementation
export default class User {
  constructor(
    public user_id: string,
    public user_token: string,
    public user_level: string,
    public user_timeStamp: Date,
    public user_name: string,
    public user_firstname: string,
    public user_lastname: string,
    public user_sex: string,
    public user_age: string,
    public user_address: string,
    public user_telephone: string,
    public user_email: string,
    public user_image: string,
    public user_password: string,
    public id?: ObjectId
  )  
  {}
  // public userHello(): void {
  //   console.log("Class User : userHello() :");
  // }
}

//  export const UserConstraintSchema: Object = {
//   collMod: process.env.USER_COLLECTION_NAME,
//   validator: {
//     $jsonSchema: {
//       bsonType: "object",
//       required: [
//         "user_name",       
//         "user_firstname",
//         "user_lastname",
//         "user_email",        
//         "user_address",
//         "user_telephone",
//         "user_password",
//         "user_level",
//         "user_timeStamp",
//       ],
//       additionalProperties: false,
//       properties: {
//         _id: {},
//         user_timeStamp: {
//           bsonType: "date",
//           description: "'user_time_stamp' is required and is a string",
//         },
//         user_level: {
//           bsonType: "string",
//           description: "'user_level' is required and is a string",
//         },
//         user_name: {
//           bsonType: "string",
//           description: "'user_name' is required and is a string",
//         },
//         user_age: {
//           bsonType: "string",
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
// }

// type Users = {
//   user_name: String,
// }
// const userSchema = z.object({
//   user_name: z.string(),
// })

// type Users = z.infer<typeof userSchema>
// const user = { user_name: "test555"}
// console.log(userSchema.parse(user))