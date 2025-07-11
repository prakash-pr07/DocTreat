import Appointment from "../models/appointmentModel.js";
import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";
import { sendAppointmentOTPEmail } from "../utils/sendAppointmentOTPEmail.js";
import crypto from "crypto";


export const bookAppointment = async (req, res) => {
  try {
    const { name, age, gender, phoneNo, email, date, time, doctorEmail } = req.body;

    // ✅ Validation
    if (!name || !age || !gender || !phoneNo || !email || !date || !time || !doctorEmail) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Find doctor by email
    const doctor = await User.findOne({ email: doctorEmail });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // ✅ Save appointment in DB
    const appointment = await Appointment.create({
      patientName: name,
      age,
      gender,
      phoneNo,
      email,
      date,
      time,
      doctorId: doctor._id,
      otp,
      status: "Pending",
    });

    // ✅ Send email to doctor with all patient details + OTP
    await sendAppointmentOTPEmail(
      doctor.email,
      otp,
      name,
      age,
      gender,
      phoneNo,
      email,
      date,
      time
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent to doctor for confirmation",
    });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to book appointment",
    });
  }
};






export const verifyAppointmentOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log("🛠️ Incoming verify-otp request:", { email, otp });

    // ✅ Trim values to avoid trailing spaces
    if (!email?.trim() || !otp?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const recentOtp = await OTP.findOne({ email: email.trim() }).sort({ createdAt: -1 });

    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "No OTP found for this email",
      });
    }

    if (recentOtp.otp !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
    });
  } catch (error) {
    console.error("❌ OTP verification error:", error.message);
    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};





export const confirmAppointment = async (req, res) => {
  try {
    const { email } = req.body;

    const doctor = await User.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const appointment = await Appointment.findOne({ doctorId: doctor._id }).sort({ createdAt: -1 });
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    appointment.isConfirmed = true;
    await appointment.save();

    await sendConfirmationEmails(appointment.email, doctor.email, appointment);

    return res.status(200).json({ success: true, message: "Appointment confirmed and emails sent" });
  } catch (error) {
    console.error("Confirm Appointment error:", error.message);
    return res.status(500).json({ success: false, message: "Confirmation failed" });
  }
};
