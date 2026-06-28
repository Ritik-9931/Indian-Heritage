import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  googleLogin,
  loginUser,
  registerUSer,
  sendOTP,
  updatePassword,
  verifyOTP,
} from "../controller/authController.js";

const router = express.Router();

router.post("/register", registerUSer);

router.post("/login", loginUser);

router.post("/googleLogin", googleLogin);

router.post("/sendOTP", sendOTP);

router.post("/verifyOTP", verifyOTP);

router.put("/updatePassword", updatePassword);

export default router;
