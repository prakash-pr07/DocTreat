import { MedicalNote } from "../models/MedicalNote.js";
import cloudinary from "cloudinary";

export const uploadMedicalNote = async (req, res) => {
  try {
    const { fileName, notes, patientId } = req.body;

    if (!req.file || !fileName || !patientId) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "medical-documents",
    });

    const newNote = await MedicalNote.create({
      patientId,
      fileName,
      notes,
      documentUrl: result.secure_url,
    });

    res.status(200).json({ success: true, note: newNote });
  } catch (error) {
    res.status(500).json({ success: false, message: "Upload failed", error });
  }
};

export const getMedicalNotes = async (req, res) => {
  try {
    const { patientId } = req.params;

    const notes = await MedicalNote.find({ patientId }).sort({ uploadedAt: -1 });

    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch failed", error });
  }
};
