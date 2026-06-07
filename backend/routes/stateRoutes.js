import express from "express";

import {
  createState,
  getSingleState,
  getStates,
} from "../controller/stateController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// CREATE STATE
router.post("/", protect, admin, createState);

// GET ALL STATES
router.get("/", getStates);

router.get("/:id", getSingleState);

export default router;
