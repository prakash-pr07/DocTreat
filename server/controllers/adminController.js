import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

export const addAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNo, city, state, password } = req.body;

    if (!firstName || !lastName || !email || !phoneNo || !city || !state || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      phoneNo,
      city,
      state,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin added successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error("❌ Error adding admin:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Optionally: Generate JWT here (if needed)
    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      admin: {
        id: admin._id,
        firstName: admin.firstName,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
