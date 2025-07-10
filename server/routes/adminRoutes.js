import express from "express";
import { addAdmin, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/add", addAdmin);
router.post("/login", loginAdmin); // ✅ Add this

export default router;
