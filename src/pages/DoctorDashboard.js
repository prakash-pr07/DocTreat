
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ChatBox from "../components/ChatBox";

// 🔌 Initialize socket
const socket = io("http://localhost:8000", {
  withCredentials: true,
  transports: ["websocket"],
});

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chatWith, setChatWith] = useState(null); // 🧑‍⚕️ Chatting with this Patient

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedChatWith = localStorage.getItem("chatWith");

    if (!storedUser) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // ✅ Register user (doctor) with their email on socket
      socket.emit("addUser", parsedUser.email);
    }

    if (storedChatWith) {
      setChatWith(JSON.parse(storedChatWith));
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Loading...
      </div>
    );
  }

  const getInitials = (name) => {
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
      : parts[0][0].toUpperCase();
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full">
      {/* Left Panel - Doctor Info */}
      <div className="w-1/4 bg-gray-100 p-6 border-r border-gray-300">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
            {getInitials(user.firstName + " " + user.lastName)}
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-500">Doctor</p>
          </div>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phoneNo}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>State:</strong> {user.state}</p>
        </div>
      </div>

      {/* Center Panel - Placeholder */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">Medical History</h1>
        <p className="text-gray-500">No Medical History</p>
      </div>

      {/* Right Panel - Chat Box */}
      <div className="w-1/4 border-l border-gray-300 bg-gray-50 p-2 flex flex-col">
         <h3 className="text-center font-semibold mb-2">Real-Time Chat</h3>
         <div className="flex-1 overflow-y-auto">
          {/* ✅ Always render ChatBox if user is set */}
          <ChatBox currentUserEmail={user.email} />
         </div>
       </div>
    </div>
  );
};

export default DoctorDashboard;
