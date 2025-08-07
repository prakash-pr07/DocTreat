
import MedicalNote from "../models/MedicalNote.js";
import cloudinary from "../utils/cloudinary.js";

export const uploadMedicalNote = async (req, res) => {
  try {
    const { fileName, notes, patientEmail } = req.body;

    if (!req.file || !fileName || !patientEmail) {
      return res.status(400).json({
        success: false,
        message: "File, File Name, and Patient ID are required",
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "medical-documents",
      resource_type: "auto",
    });

    const newNote = await MedicalNote.create({
      patientEmail,
      fileName,
      notes,
      documentUrl: result.secure_url,
    });

    res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Upload failed", error });
  }
};

export const getMedicalNotes = async (req, res) => {
  try {
    const { patientEmail } = req.params;

    const notes = await MedicalNote.find({ patientEmail }).sort({ uploadedAt: -1 });

    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ success: false, message: "Fetch failed", error });
  }
};
