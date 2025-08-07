// import express from "express";
// import multer from "multer";
// import {
//   uploadMedicalNote,
//   getMedicalNotes,
// } from "../controllers/medicalNoteController.js";

// const router = express.Router();

// const storage = multer.diskStorage({});
// const upload = multer({ storage });

// router.post("/upload", upload.single("document"), uploadMedicalNote);
// router.get("/:patientId", getMedicalNotes);

// export default router;



import express from "express";
import multer from "multer";
import { uploadMedicalNote, getMedicalNotes } from "../controllers/medicalNoteController.js";

const router = express.Router();

// 🧠 Multer Storage: use memory for temp file upload (can also use diskStorage if needed)
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/upload", upload.single("document"), uploadMedicalNote);
router.get("/:patientEmail", getMedicalNotes);

export default router;
