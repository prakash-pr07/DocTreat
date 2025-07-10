import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//  Middleware to check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Check if user is Admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};


// Optional: Check if user is Doctor
export const isDoctor = (req, res, next) => {
  if (req.user.role !== "Doctor") {
    return res.status(403).json({ message: "Access denied. Doctors only." });
  }
  next();
};

//  Optional: Check if user is Patient
export const isPatient = (req, res, next) => {
  if (req.user.role !== "Patient") {
    return res.status(403).json({ message: "Access denied. Patients only." });
  }
  next();
};

// Check if user is Premium (e.g., paid member)
export const checkPremium = (req, res, next) => {
  if (!req.user?.isPremium) {
    return res.status(403).json({ message: "Access denied. Premium members only." });
  }
  next();
};
