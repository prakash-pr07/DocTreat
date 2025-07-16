import mongoose from "mongoose";

const medicalNoteSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    documentUrl: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const MedicalNote = mongoose.model("MedicalNote", medicalNoteSchema);
