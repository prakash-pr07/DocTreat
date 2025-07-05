// src/pages/DoctorDashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  if (!user) return null;

  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    } else if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    } else {
      return "D";
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Left Section - 25% */}
      <div className="w-1/4 bg-gray-100 p-6 border-r-2">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
            {getInitials(user.firstName + " " + user.lastName)}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{user.firstName} {user.lastName}</h2>
            <p className="text-sm text-gray-500">Doctor</p>
          </div>
        </div>
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phoneNo}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>State:</strong> {user.state}</p>
        </div>
      </div>

      {/* Middle Section - 50% */}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-4">Medical History</h1>
        <p className="text-gray-500">No Medical History</p>
      </div>

      {/* Right Section - 25% (Chat placeholder) */}
      <div className="w-1/4 bg-gray-50 p-4 border-l-2">
        <h2 className="font-semibold text-lg mb-2">Real-Time Chat</h2>
        <p className="text-gray-400 text-sm">Chat section coming soon...</p>
      </div>
    </div>
  );
};

export default DoctorDashboard;
