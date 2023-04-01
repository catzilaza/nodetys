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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.signinUser = exports.createUser = exports.getUserById = exports.getUserAll = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const mongodb_1 = require("mongodb");
const dessertDbService_1 = require("../services/dessertDbService");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// GET
function getUserAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // let checkInputUser:User = new User("","","","","","","","","","","");
            // checkInputUser.userHello();
            const users = (yield dessertDbService_1.collections.users
                .find({})
                .toArray());
            res.status(200).send(users);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    });
}
exports.getUserAll = getUserAll;
function getUserById(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        try {
            const query = { _id: new mongodb_1.ObjectId(id) };
            const user = (yield dessertDbService_1.collections.users.findOne(query));
            if (user) {
                res.status(200).send(user);
            }
        }
        catch (error) {
            res
                .status(404)
                .send(`Unable to find matching document with id: ${req.params.id}`);
        }
    });
}
exports.getUserById = getUserById;
// POST
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = req.body;
            const queryusername = { user_name: newUser.user_name };
            const usernameResult = (yield dessertDbService_1.collections.users.findOne(queryusername));
            if (usernameResult) {
                return res
                    .status(409)
                    .send("unprocessable entity ! USERNAME already has been created !");
            }
            const queryuseremail = { user_email: newUser.user_email };
            const useremailResult = (yield dessertDbService_1.collections.users.findOne(queryuseremail));
            if (useremailResult) {
                return res
                    .status(409)
                    .send("unprocessable entity ! E-MAIL already has been created !");
            }
            // set user level, date/timestamp and encrypt password
            newUser.user_level = "Level User";
            newUser.user_timeStamp = new Date();
            newUser.user_password = yield bcryptjs_1.default.hash(newUser.user_password, 10);
            const result = yield dessertDbService_1.collections.users.insertOne(newUser);
            result
                ? res
                    .status(201)
                    .send(`Successfully created a new user with id ${result.insertedId}`)
                : res.status(500).send("Failed to create a new user.");
        }
        catch (error) {
            console.error(error);
            res.status(400).send(error.message);
        }
    });
}
exports.createUser = createUser;
function signinUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usersignin = req.body;
            const query = { user_name: usersignin.user_name };
            const usernameResult = (yield dessertDbService_1.collections.users.findOne(query));
            if (!usernameResult) {
                return res.status(409).send(`USERNAME has not been registered`);
            }
            //Create token
            if (usernameResult) {
                const user_id = usernameResult.user_id;
                const user_email = usernameResult.user_email;
                const user_token = jsonwebtoken_1.default.sign({ user_id, user_email }, `process.env.ACCESS_TOKEN_SECRET_KEY`, {
                    expiresIn: "3m",
                    algorithm: "HS256",
                });
                usernameResult.user_token = user_token;
                res.status(200).send(usernameResult);
            }
        }
        catch (error) {
            res
                .status(404)
                .send(`Unable to find matching document with user_name: ${req.body.user_name}`);
        }
    });
}
exports.signinUser = signinUser;
// PUT
function updateUserById(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        try {
            const updatedUser = req.body;
            const query = { _id: new mongodb_1.ObjectId(id) };
            const result = yield dessertDbService_1.collections.users.updateOne(query, {
                $set: updatedUser,
            });
            result
                ? res.status(200).send(`Successfully updated user with id ${id}`)
                : res.status(304).send(`User with id: ${id} not updated`);
        }
        catch (error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    });
}
exports.updateUserById = updateUserById;
// Delete
function deleteUserById(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        try {
            const query = { _id: new mongodb_1.ObjectId(id) };
            const result = yield dessertDbService_1.collections.users.deleteOne(query);
            if (result && result.deletedCount) {
                res.status(202).send(`Successfully removed user with id ${id}`);
            }
            else if (!result) {
                res.status(400).send(`Failed to remove user with id ${id}`);
            }
            else if (!result.deletedCount) {
                res.status(404).send(`User with id ${id} does not exist`);
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    });
}
exports.deleteUserById = deleteUserById;
