// models/userModel.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phone:     { type: String, required: true },
  password:  { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String, required: true },
  role:      { type: String, enum: ["Patient", "Doctor"], default: "Patient" },
  isPremium: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);

