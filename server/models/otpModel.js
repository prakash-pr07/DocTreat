// models/otpModel.js

import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // auto-delete after 5 mins
  },
});

export default mongoose.model("OTP", otpSchema);

