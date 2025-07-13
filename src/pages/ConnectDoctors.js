
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ConnectDoctors = () => {
  const [city, setCity] = useState("");
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!city.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/doctors/search/city?city=${city}`
      );
      const data = await res.json();

      if (res.ok && data.success) {
        setDoctors(data.doctors);
      } else {
        setDoctors([]);
        toast.error(data.message || "No doctors found.");
      }
    } catch (error) {
      console.error("Search Error:", error);
      toast.error("Something went wrong.");
    }
  };

  const formatName = (first = "", last = "") => {
    return (
      first.charAt(0).toUpperCase() +
      first.slice(1) +
      " " +
      last.charAt(0).toUpperCase() +
      last.slice(1)
    );
  };

  const handleConnectClick = (doc) => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      toast.warning("Please login first to connect with a doctor.");
      return;
    }

    const user = JSON.parse(userData);

    if (!user.isPremium) {
      toast.warning("Please Be A Premium Member first.");
      return;
    }

    navigate(`/doctor/${doc._id}`, { state: { doctor: doc } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <ToastContainer position="top-center" />
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-800">
        Find Doctors by City
      </h2>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border px-4 py-2 rounded w-64 sm:w-72"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.length === 0 && city.trim() && (
          <p className="text-center text-gray-600 col-span-full">
            No doctors found for "{city}".
          </p>
        )}

        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white p-4 shadow rounded-lg flex flex-col items-center"
          >
            <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
              {doc.firstName?.[0]?.toUpperCase() || ""}
              {doc.lastName?.[0]?.toUpperCase() || ""}
            </div>
            <h3 className="text-lg font-semibold mt-2">
              {formatName(doc.firstName, doc.lastName)}
            </h3>
            <button
              onClick={() => handleConnectClick(doc)}
              className="mt-3 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 w-full"
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectDoctors;
