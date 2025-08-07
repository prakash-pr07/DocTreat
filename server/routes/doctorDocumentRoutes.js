import express from "express";
import { uploadDoctorDocument, getAllDoctorDocuments } from "../controllers/doctorDocumentController.js";
import upload from "../middleware/multer.js"; // ✅ Make sure file is in `middlewares/` folder

const router = express.Router();

// POST /api/doctor/upload-document
router.post("/upload-document", upload.single("document"), uploadDoctorDocument);

// GET /api/doctor/all-documents
router.get("/all-documents", getAllDoctorDocuments);

export default router;
