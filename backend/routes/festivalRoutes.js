import express from "express";

import {
  createFestival,
  getFestivals,
  getSingleFestival,
  updateFestival,
  deleteFestival,
} from "../controller/festivalController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// CREATE FESTIVAL
router.post("/", protect, admin, createFestival);

// GET ALL FESTIVALS
router.get("/", getFestivals);

// GET SINGLE FESTIVAL
router.get("/:id", getSingleFestival);

// UPDATE FESTIVAL
router.put("/:id", protect, admin, updateFestival);

// DELETE FESTIVAL
router.delete("/:id", protect, admin, deleteFestival);

export default router;
