import React, { useEffect, useState } from "react";

const PatientDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  // Extract initials
  const initials =
    user.firstName?.charAt(0).toUpperCase() + user.lastName?.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen w-full">
      {/* Left: User Info */}
      <div className="w-1/4 bg-blue-50 p-6 border-r border-gray-300">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-blue-700 text-white flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>
          <div className="text-xl font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-gray-600">{user.email}</div>
          <div className="text-sm text-gray-600">{user.phoneNo}</div>
          <div className="text-sm text-gray-600">
            {user.city}, {user.state}
          </div>
        </div>
      </div>

      {/* Center: Medical History */}
      <div className="w-1/2 p-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Medical History</h2>
        <p className="text-gray-600">No Medical History</p>
      </div>

      {/* Right: Chat Section (Placeholder) */}
      <div className="w-1/4 p-6 border-l border-gray-300 bg-gray-100">
        <h3 className="text-xl font-bold mb-4">Chat with Doctor</h3>
        <p className="text-gray-600">Coming soon...</p>
      </div>
    </div>
  );
};

export default PatientDashboard;
