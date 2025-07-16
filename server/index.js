import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";
import aiRoutes from "./routes/aiRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import paymentRoutes from "./routes/paymentRoutes.js";
import { connect } from "./config/database.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

import medicalNoteRoutes from "./routes/medicalNoteRoutes.js";
import http from "http";
import { initSocket } from "./utils/socket.js"; //  Import socket initializer

dotenv.config();
const app = express();
const server = http.createServer(app); // Wrap app with HTTP server

//  Initialize Socket.IO
initSocket(server);

//  Middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());

//  DB connect
connect();

//  Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", aiRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/admins", adminRoutes);

app.use("/api/payment", paymentRoutes);
app.use("/api/appointment", appointmentRoutes);

app.use("/api/medical-notes", medicalNoteRoutes);

// 👇 Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
