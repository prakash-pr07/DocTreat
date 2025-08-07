

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import MedicalHistoryPanel from "../components/MedicalHistoryPanel";

const socket = io("http://localhost:8000", {
  withCredentials: true,
  transports: ["websocket"],
});

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [document, setDocument] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyNotes, setHistoryNotes] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      socket.emit("addUser", parsedUser.email);
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

  const handleUpload = async () => {
    if (!patientName || !patientEmail || !document) {
      toast.error("All fields including document are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", patientName);
    formData.append("email", patientEmail);
    formData.append("notes", notes);
    formData.append("document", document);

    try {
      const res = await axios.post("/api/doctor/upload-document", formData);

      if (res.status === 200 || res.status === 201) {
        toast.success("✅ Document Uploaded Successfully");
      } else {
        toast.error("Unexpected response. Please try again.");
      }

      setPatientName("");
      setPatientEmail("");
      setNotes("");
      setDocument(null);
    } catch (err) {
      console.error(err);
      toast.error("❌ Upload Failed");
    }

    // --- OR Use This Toast UX instead ---
    /*
    try {
      await toast.promise(
        axios.post("/api/doctor/upload-document", formData),
        {
          loading: "Uploading...",
          success: "✅ Document Uploaded Successfully",
          error: "❌ Upload Failed",
        }
      );

      setPatientName("");
      setPatientEmail("");
      setNotes("");
      setDocument(null);
    } catch (err) {
      console.error(err);
    }
    */
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `/api/documents/history-by-doctor?doctorEmail=${user.email}`
      );
      setHistoryNotes(res.data);
      setShowHistory(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to Load History");
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full">
      {/* Left Sidebar */}
      <div className="w-1/4 p-6 bg-gray-50 border-r border-gray-200 overflow-y-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-blue-600 text-white text-xl rounded-full flex items-center justify-center font-bold">
            {getInitials(user.firstName + " " + user.lastName)}
          </div>
          <div>
            <h2 className="font-semibold text-lg">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-600">Doctor</p>
          </div>
        </div>

        <div className="text-sm text-gray-800 space-y-1">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phoneNo}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>State:</strong> {user.state}</p>
        </div>
      </div>

      {/* Center Section */}
      <div className="w-1/2 p-6 overflow-y-auto flex flex-col items-center">
        {!showHistory ? (
          <>
            <div className="text-gray-400 text-center mt-20 mb-6">
              Document history not yet opened.
            </div>
            <button
              onClick={fetchHistory}
              className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded transition"
            >
              See Patient History
            </button>
          </>
        ) : (
          <MedicalHistoryPanel notes={historyNotes} />
        )}
      </div>

      {/* Right Upload Panel */}
      <div className="w-1/4 p-5 border-l border-gray-200 bg-gradient-to-br from-white to-purple-50">
        <h2 className="text-center text-lg font-semibold text-purple-700 mb-4">
          Upload Patient Document
        </h2>

        <input
          type="text"
          placeholder="File Name / Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="email"
          placeholder="Patient Email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <textarea
          placeholder="Mark Your Points"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded resize-none h-24 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="file"
          onChange={(e) => setDocument(e.target.files[0])}
          className="mb-3"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded mb-3 transition"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
