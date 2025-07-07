import express from "express";
import { searchDoctorsByCity } from "../controllers/doctorController.js";

const router = express.Router();

// ✅ Keep only this route
router.get("/search/city", searchDoctorsByCity);

export default router;
