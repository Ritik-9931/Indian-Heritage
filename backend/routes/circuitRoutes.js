import express from "express";

import {
  createCircuit,
  getCircuits,
  getSingleCircuit,
  updateCircuit,
  deleteCircuit,
} from "../controller/circuitController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// CREATE CIRCUIT
router.post("/", protect, admin, createCircuit);

// GET ALL CIRCUITS
router.get("/", getCircuits);

// GET SINGLE CIRCUIT
router.get("/:id", getSingleCircuit);

// UPDATE CIRCUIT
router.put("/:id", protect, admin, updateCircuit);

// DELETE CIRCUIT
router.delete("/:id", protect, admin, deleteCircuit);

export default router;
