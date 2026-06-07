import express from "express";

import {
  createCity,
  deleteCity,
  getCities,
  getCitiesByState,
  getSingleCity,
  updateCity,
} from "../controller/cityController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// CREATE CITY
router.post("/", protect, admin, createCity);

// GET ALL CITIES
router.get("/", getCities);

// GET CITIES BY STATE
router.get("/state/:stateId", getCitiesByState);

router.get("/:id", getSingleCity);
export default router;

// UPDATE CITY
router.put("/:id", protect, admin, updateCity);

// DELETE CITY
router.delete("/:id", protect, admin, deleteCity);
