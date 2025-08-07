// Update: Use User model instead of Doctor
import User from "../models/userModel.js";

// 🔍 Search doctors by city from `User` model
export const searchDoctorsByCity = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ success: false, message: "City is required" });
    }

    const doctors = await User.find({
      city: { $regex: new RegExp(city, "i") },
      role: "Doctor"
    }).select("-password"); // Don't send password

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("Error searching doctors by city:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// Keep this if you still want to manually add Doctor via /api/v1/doctors //


export const addDoctor = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNo, city, state } = req.body;

    if (!firstName || !lastName || !email || !phoneNo || !city || !state) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newDoctor = new Doctor({ firstName, lastName, email, phoneNo, city, state });
    await newDoctor.save();

    res.status(201).json({ success: true, message: "Doctor added successfully", doctor: newDoctor });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


