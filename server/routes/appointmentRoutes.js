import express from "express";
import { bookAppointment, verifyAppointmentOtp } from "../controllers/appointmentController.js";
const router = express.Router();

router.post("/book", bookAppointment); // for sending OTP
router.post("/verify-otp", verifyAppointmentOtp); // for OTP verification

export default router;
