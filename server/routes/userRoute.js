
import express from "express";
import {
  signup,
  login,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/authController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// OTP routes
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

// Password routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/update-password", isAuthenticated, updatePassword);

export default router;
