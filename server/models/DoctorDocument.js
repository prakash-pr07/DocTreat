import mongoose from "mongoose";

const doctorDocumentSchema = new mongoose.Schema({
  doctorEmail: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  documentUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("DoctorDocument", doctorDocumentSchema);
