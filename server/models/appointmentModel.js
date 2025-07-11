import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  age: Number,
  gender: String,
  phoneNo: String,
  email: String,
  date: String,
  time: String,
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  otp: String,
});

export default mongoose.model("Appointment", appointmentSchema);
