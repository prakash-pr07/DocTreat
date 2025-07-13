import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  if (!doctor) {
    return (
      <div className="text-center p-10 text-red-600 font-bold">
        Doctor information not available.
        <button
          className="underline text-blue-600 ml-2"
          onClick={() => navigate("/connect-doctors")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const getInitials = (firstName, lastName) => {
    return (
      (firstName?.charAt(0).toUpperCase() || "") +
      (lastName?.charAt(0).toUpperCase() || "")
    );
  };

  const handleStartChat = () => {
    localStorage.setItem("chatWith", JSON.stringify(doctor));
    navigate("/patient/dashboard");
  };

  const handleBookAppointment = () => {
    navigate("/book-appointment", { state: { doctor } });
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex justify-center items-start py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-800">
            {getInitials(doctor.firstName, doctor.lastName)}
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            {doctor.firstName.charAt(0).toUpperCase() + doctor.firstName.slice(1)}{" "}
            {doctor.lastName.charAt(0).toUpperCase() + doctor.lastName.slice(1)}
          </h2>

          <p className="text-gray-700">
            <strong>Email:</strong> {doctor.email}
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> {doctor.phoneNo}
          </p>
          <p className="text-gray-700">
            <strong>City:</strong> {doctor.city}
          </p>
          <p className="text-gray-700">
            <strong>State:</strong> {doctor.state}
          </p>

          {/* ✅ Chat Button */}
          <button
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={handleStartChat}
          >
            Chat With Me
          </button>

          {/* 🆕 Book Appointment Button */}
          <button
            className="mt-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            onClick={handleBookAppointment}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
