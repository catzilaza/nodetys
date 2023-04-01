"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dessertRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const dessertController_1 = require("../controllers/dessertController");
// Global Config
exports.dessertRouter = express_1.default.Router();
exports.dessertRouter.use(express_1.default.json());
// GET
exports.dessertRouter.get("/", dessertController_1.getDessertAll);
exports.dessertRouter.get("/:id", dessertController_1.getDessertById);
// POST
exports.dessertRouter.post("/", dessertController_1.createDessert);
// PUT
exports.dessertRouter.put("/:id", dessertController_1.updateDessertById);
// DELETE
exports.dessertRouter.delete("/:id", dessertController_1.deleteDessertById);
