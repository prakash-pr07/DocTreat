// server/models/Doctor.js
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  profilePic: {
    type: String,
    default: "", // URL of image if needed
  },
  role: {
    type: String,
    default: "Doctor",
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
