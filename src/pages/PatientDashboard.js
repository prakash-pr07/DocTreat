
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import ChatBox from "../components/ChatBox";
import "react-toastify/dist/ReactToastify.css";

// Razorpay script load only once
if (typeof window !== "undefined" && !window.Razorpay) {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
}

const socket = io("http://localhost:8000", {
  withCredentials: true,
  transports: ["websocket"],
});

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [chatWith, setChatWith] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedChatWith = localStorage.getItem("chatWith");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      socket.emit("addUser", parsedUser.email);
    }

    if (storedChatWith) {
      setChatWith(JSON.parse(storedChatWith));
    }
  }, []);

  const handleBuyPremium = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/payment/create-order",
        {},
        { withCredentials: true }
      );

      const { order } = res.data;

      const options = {
        key: "rzp_test_AA7AfdWnHFHCrG",
        amount: order.amount,
        currency: "INR",
        name: "DocTreat",
        description: "Premium Membership",
        order_id: order.id,
        handler: async function (response) {
          try {
            const token = localStorage.getItem("token");
            const verify = await axios.post(
              "http://localhost:8000/api/payment/verify",
              response,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (verify.data.success) {
              toast.success("You are now a Premium Member!");
              const updatedUser = { ...user, isPremium: true };
              localStorage.setItem("user", JSON.stringify(updatedUser));
              setUser(updatedUser);
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Verification failed.");
          }
        },
        prefill: {
          name: user.firstName,
          email: user.email,
        },
        theme: {
          color: "#0f172a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      toast.error("Payment initiation failed.");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  const initials =
    user.firstName?.charAt(0).toUpperCase() +
    user.lastName?.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] w-full">
      <ToastContainer position="top-center" />

      {/* 🧑‍⚕️ Left - Patient Info */}
      <div className="w-full md:w-1/4 bg-blue-50 p-6 border-r border-gray-300">
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

          {/* ✅ Premium Button */}
          {!user.isPremium && (
            <button
              onClick={handleBuyPremium}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded w-full text-center"
            >
              Buy Premium ₹10
            </button>
          )}
        </div>
      </div>

      {/* 📋 Center - Placeholder Section */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Medical History</h2>
        <p className="text-gray-600">No Medical History</p>
      </div>

      {/* 💬 Right Panel - Chat Box */}
      <div className="w-full md:w-1/4 border-t md:border-t-0 md:border-l border-gray-300 bg-gray-50 p-2 flex flex-col">
        <h3 className="text-center font-semibold mb-2">Real-Time Chat</h3>
        <div className="flex-1 overflow-y-auto">
          <ChatBox currentUserEmail={user.email} />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
