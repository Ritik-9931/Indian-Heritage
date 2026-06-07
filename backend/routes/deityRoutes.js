import express from "express";

import {
  createDeity,
  getDeities,
  getSingleDeity,
  updateDeity,
  deleteDeity,
} from "../controller/deityController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// CREATE DEITY
router.post("/", protect, admin, createDeity);

// GET ALL DEITIES
router.get("/", getDeities);

// GET SINGLE DEITY
router.get("/:id", getSingleDeity);

// UPDATE DEITY
router.put("/:id", protect, admin, updateDeity);

// DELETE DEITY
router.delete("/:id", protect, admin, deleteDeity);

export default router;
