import express from "express";

import {
  createRitual,
  deleteRitual,
  getRituals,
  getSingleRitual,
  updateRitual,
} from "../controller/ritualController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getRituals);

router.get("/:id", getSingleRitual);

// ADMIN
router.post("/", protect, admin, createRitual);

router.put("/:id", protect, admin, updateRitual);

router.delete("/:id", protect, admin, deleteRitual);

export default router;
