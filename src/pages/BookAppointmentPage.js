
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

    if (name === "email") {
      value = value.replace(/@+/g, "@");
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/appointment/book", {
        ...formData,
        doctorEmail: doctor.email,
      });

      if (res.data.success) {
        localStorage.setItem("doctorEmail", doctor.email);
        toast.success("OTP sent to doctor for appointment confirmation");
        setShowOtpSection(true);
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

      const res = await axios.post("http://localhost:8000/api/appointment/verify-otp", {
        email,
        otp
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6 text-white">Book Appointment</h2>

      <div
        className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 
        p-8 rounded-xl max-w-md w-full text-white
        shadow-[0_0_40px_rgba(139,92,246,0.4)] 
        hover:shadow-[0_0_60px_rgba(96,165,250,0.5)] 
        border-[3px] border-transparent 
        outline outline-2 outline-purple-500/30 
        transition-all duration-1000 ease-in-out space-y-4"
      >
        {["name", "age", "phoneNo", "email", "date"].map((field) => (
          <input
            key={field}
            type={field === "date" ? "date" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
        ))}

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-black"
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
          className="w-full p-2 border border-gray-300 rounded text-black"
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
              className="w-full p-2 border border-gray-300 rounded text-black mt-4"
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
