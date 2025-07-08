// src/pages/ConnectDoctors.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConnectDoctors = () => {
  const [city, setCity] = useState("");
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!city.trim()) return;

    console.log("Searching doctors in:", city);

    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/doctors/search/city?city=${city}`
      );
      const data = await res.json();

      console.log("API Response:", data);

      if (res.ok && data.success) {
        setDoctors(data.doctors);
      } else {
        setDoctors([]);
        alert(data.message || "No doctors found.");
      }
    } catch (error) {
      console.error("Search Error:", error);
      alert("Something went wrong.");
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
        Find Doctors by City
      </h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border px-4 py-2 rounded-l w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
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
            onClick={() => navigate(`/doctor/${doc._id}`, { state: { doctor: doc } })}
            className="mt-3 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
            Connect
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectDoctors;
