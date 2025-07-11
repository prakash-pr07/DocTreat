import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookAppointmentPage = () => {
  const { state } = useLocation();
  const doctor = state?.doctor;

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phoneNo: "",
    email: "",
    date: "",
    time: "Morning",
  });

  const [otp, setOtp] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
  let { name, value } = e.target;

  // ✅ Sanitize email to remove accidental extra @
  if (name === "email") {
    value = value.replace(/@+/g, "@");  // 🛠️ Fix double @@
  }

  setFormData({ ...formData, [name]: value });
};


  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/appointment/book", {
        ...formData,
        doctorEmail: doctor.email,
      });

      console.log("Verifying OTP with email:", doctor.email);


      if (res.data.success) {
        localStorage.setItem("doctorEmail", doctor.email); // ✅ Store doctor email safely
        toast.success("OTP sent to doctor for appointment confirmation");
        setShowOtpSection(true); // ✅ Show OTP section after booking
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Failed to send appointment request");
    }
  };


  
const handleOtpVerify = async () => {
  try {
    const email = localStorage.getItem("doctorEmail");

    if (!email) {
      toast.error("Doctor email not found. Please try again.");
      return;
    }

    console.log("🔍 Sending OTP verify request with email:", email);

    const res = await axios.post("http://localhost:8000/api/appointment/verify-otp", {
      email,
      otp,
    });

    if (res.data.success) {
      toast.success("OTP Verified! Now confirm the appointment.");
      setOtpVerified(true);
    } else {
      toast.error(res.data.message || "Invalid OTP");
    }
  } catch (err) {
    console.error("OTP Verification Error:", err);
    toast.error("Failed to verify OTP");
  }
};



  const handleConfirmAppointment = async () => {
    try {
      const email = localStorage.getItem("doctorEmail");
      const res = await axios.post("http://localhost:8000/api/appointment/confirm", {
        email,
      });

      if (res.data.success) {
        toast.success("Appointment Confirmed and Emails Sent!");
        localStorage.removeItem("doctorEmail");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error("Final confirmation error:", err);
      toast.error("Failed to confirm appointment");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Book Appointment</h2>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        {["name", "age", "phoneNo", "email", "date"].map((field) => (
          <input
            key={field}
            type={field === "date" ? "date" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ))}

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Book Now
        </button>

        {showOtpSection && (
          <>
            <input
              type="text"
              placeholder="Enter OTP received by doctor"
              className="w-full p-2 border border-gray-300 rounded mt-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleOtpVerify}
              className="w-full mt-2 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
            >
              Confirm OTP From Doctor
            </button>
          </>
        )}

        {otpVerified && (
          <button
            onClick={handleConfirmAppointment}
            className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Confirm Appointment
          </button>
        )}
      </div>
    </div>
  );
};

export default BookAppointmentPage;
