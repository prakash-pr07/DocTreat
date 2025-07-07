// server/routes/aiRoutes.js
import express from "express";
import { askMedicalAI } from "../controllers/aiController.js";

const router = express.Router();
router.post("/ask-ai", askMedicalAI);
export default router;
