import React from "react";

const AdminDashboard = () => {
  // Dummy data — in real case, you can fetch from localStorage or API
  const admin = {
    profilePic: "/images/admin.jpg", // ✅ path from public folder
    firstName: "Prakash Shekhar",
    lastName: "Singh",
    email: "prakashranjan8454@gmail.com",
    phoneNo: "9576409201",
    city: "Patna",
    state: "Bihar",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <img
          src={admin.profilePic}
          alt="Admin Profile"
          className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-800"
        />
        <h2 className="text-2xl font-bold mt-4 text-blue-800">
          {admin.firstName} {admin.lastName}
        </h2>
        <p className="text-gray-600 mt-2 font-medium">{admin.email}</p>
        <p className="text-gray-600">{admin.phoneNo}</p>
        <p className="text-gray-600">{admin.city}, {admin.state}</p>

        <div className="mt-6 border-t pt-4">
          <p className="text-blue-700 font-semibold tracking-wide">Owner</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
