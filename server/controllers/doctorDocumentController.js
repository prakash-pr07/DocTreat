import DoctorDocument from "../models/DoctorDocument.js";

export const uploadDoctorDocument = async (req, res) => {
  try {
    const { patientName, patientEmail, notes } = req.body;

    if (!req.file || !patientName || !patientEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newDoc = new DoctorDocument({
      doctorEmail: req.user.email, // Or directly from token/session
      patientName,
      patientEmail,
      notes,
      documentUrl: req.file.path,
    });

    await newDoc.save();
    res.status(201).json({ message: "Document uploaded successfully" });
  } catch (err) {
    console.error("Upload Failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

export const getAllDoctorDocuments = async (req, res) => {
  try {
    const doctorEmail = req.user.email;

    const docs = await DoctorDocument.find({ doctorEmail }).sort({ uploadedAt: -1 });
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: "Fetching failed" });
  }
};
