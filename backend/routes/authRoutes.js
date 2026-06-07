import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  googleLogin,
  loginUser,
  registerUSer,
} from "../controller/authController.js";

const router = express.Router();

router.post("/register", registerUSer);

router.post("/login", loginUser);

router.post("/googleLogin", googleLogin);

export default router;
