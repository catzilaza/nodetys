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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Authenticate = (req, res, next) => {
    try {
        const token = req.body.token ||
            req.query.token ||
            req.headers["x-access-token"] ||
            req.headers.authorization;
        try {
            const decoded = jsonwebtoken_1.default.verify(token, `process.env.ACCESS_TOKEN_SECRET_KEY`);
            console.log("decoded : ", decoded);
        }
        catch (error) {
            return res.status(401).send("Invalid Token");
        }
        next();
    }
    catch (error) {
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
exports.Authenticate = Authenticate;
