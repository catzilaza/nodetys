"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.use(express_2.default.json());
exports.userRouter.get("/", userController_1.getUserAll);
exports.userRouter.get("/:id", userController_1.getUserById);
exports.userRouter.post("/", userController_1.createUser);
exports.userRouter.post("/signin", userController_1.signinUser);
exports.userRouter.put("/:id", userController_1.updateUserById);
exports.userRouter.delete("/:id", userController_1.deleteUserById);
