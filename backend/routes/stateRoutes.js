import express from "express";

import {
  createState,
  deleteState,
  getSingleState,
  getStates,
  updateState,
} from "../controller/stateController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// CREATE
router.post("/", protect, admin, createState);

// READ
router.get("/", getStates);
router.get("/:id", getSingleState);

// UPDATE
router.put("/:id", protect, admin, updateState);

// DELETE
router.delete("/:id", protect, admin, deleteState);

export default router;
