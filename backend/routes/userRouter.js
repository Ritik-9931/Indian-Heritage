import express from "express";

import {
  getProfile,
  addFavoriteTemple,
  removeFavoriteTemple,
  addVisitedTemple,
  removeVisitedTemple,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controller/userController.js";

import protect from "../middleware/authMiddleware.js";

import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);

router.put("/favorite/:templeId", protect, addFavoriteTemple);

router.delete("/favorite/:templeId", protect, removeFavoriteTemple);

router.put("/visited/:templeId", protect, addVisitedTemple);

router.delete("/visited/:templeId", protect, removeVisitedTemple);

router.get("/", protect, admin, getAllUsers);

router.put("/:id/role", protect, admin, updateUserRole);

router.delete("/:id", protect, admin, deleteUser);

export default router;
