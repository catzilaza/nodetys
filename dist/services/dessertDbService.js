"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase1 = exports.collections = void 0;
// External Dependencies
const mongoDB = __importStar(require("mongodb"));
const dotenv = __importStar(require("dotenv"));
//import { UserConstraintSchema } from "../models/userModel";
// Global Variables
exports.collections = {};
// Initialize Connection
function connectToDatabase1() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv.config();
        const client = new mongoDB.MongoClient(`${process.env.DB1_CONN_STRING}`);
        yield client.connect();
        const db = client.db(process.env.DB1_NAME);
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
        const dessertCollection = db.collection(`${process.env.DESSERT_COLLECTION_NAME}`);
        const userCollection = db.collection(`${process.env.USER_COLLECTION_NAME}`);
        exports.collections.desserts = dessertCollection;
        exports.collections.users = userCollection;
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${dessertCollection.collectionName}
    and collection: ${userCollection.collectionName}`);
    });
}
exports.connectToDatabase1 = connectToDatabase1;
