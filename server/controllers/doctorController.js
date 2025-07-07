import Doctor from "../models/Doctor.js";

export const searchDoctorsByCity = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ success: false, message: "City is required" });
    }

    const doctors = await Doctor.find({ city: { $regex: new RegExp(city, "i") } });

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("Error searching doctors by city:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

