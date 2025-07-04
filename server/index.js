// server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";  // 🔥 add `.js` extension in ESM
import { connect } from "./config/database.js";  // 🔥 add `.js`

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Connect to DB
connect();

// Routes
app.use("/api/v1", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
