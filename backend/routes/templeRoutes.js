import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  createTemple,
  getTempleById,
  getTemples,
  addReview,
  deleteReview,
} from "../controller/templeController.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, upload.array("images", 20), createTemple);

router.get("/", getTemples);

router.get("/:id", getTempleById);

router.post("/:id/review", protect, addReview);

router.delete("/:id/review/:reviewId", protect, deleteReview);

export default router;
