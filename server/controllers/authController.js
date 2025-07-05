import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import OTP from "../models/otpModel.js";

//==================Send OTP===================//
export const sendOtp = async (req, res) => {
  try {
    console.log(req.body);
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ success: false, message: "Email is required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await OTP.create({ email, otp, createdAt: new Date() });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `LoGic Legal <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for LoGic Legal Verification",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    return res.status(500).json({ success: false, message: "OTP send failed" });
  }
};

//==================Verify OTP=======================//
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOtp || recentOtp.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    return res.status(200).json({ success: true, message: "OTP verified" });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ success: false, message: "OTP verification failed" });
  }
};

// ====================Signup====================//
export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      city,
      state,
      role,
    } = req.body;

    if (
      !firstName || !lastName || !email || !phone ||
      !password || !confirmPassword || !city || !state || !role
    ) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role,
      city,
      state,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      success: true,
      message: `Account created for ${firstName}`,
      user,
      token,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ success: false, message: "Signup failed" });
  }
};

//============== Login ==================//
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Use "email" directly
    const user = await User.findOne({
      $or: [{ email: email }, { phone: email }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message  // log the exact error for debugging
    });
  }
};


// ================ Forgot Password ================= //
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await OTP.create({ email, otp });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `LoGic Legal <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP for Password Reset",
      text: `Your OTP is: ${otp}. Valid for 5 minutes.`,
    });

    res.status(200).json({ success: true, message: "OTP sent for password reset" });
  } catch (error) {
    console.error("Forgot Password error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// ================ Reset Password =================== //
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
    if (!recentOtp || recentOtp.otp !== otp)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    const hashed = await bcrypt.hash(newPassword, 12);
    await User.findOneAndUpdate({ email }, { password: hashed });

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Reset failed" });
  }
};

// ================= Update Password ====================== //
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match)
      return res.status(400).json({ message: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update password" });
  }
};




