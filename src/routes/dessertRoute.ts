// External Dependencies
import express from "express";

import {
  getDessertAll,
  getDessertById,
  createDessert,
  updateDessertById,
  deleteDessertById,
} from "../controllers/dessertController";
// Global Config
export const dessertRouter = express.Router();

dessertRouter.use(express.json());
// GET
dessertRouter.get("/", getDessertAll);

dessertRouter.get("/:id", getDessertById);

// POST
dessertRouter.post("/", createDessert);
// PUT
dessertRouter.put("/:id", updateDessertById);

// DELETE
dessertRouter.delete("/:id", deleteDessertById);
