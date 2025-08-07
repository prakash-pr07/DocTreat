import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiUploadCloud } from "react-icons/fi";

const UploadPatientDetails = ({ doctorEmail }) => {
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!patientName || !patientEmail || !notes || !file) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("patientName", patientName);
    formData.append("patientEmail", patientEmail);
    formData.append("notes", notes);
    formData.append("uploadedBy", doctorEmail);

    try {
      const res = await axios.post("/api/doctor/upload", formData);
      toast.success("Details uploaded successfully");
      // Optionally clear form
      setPatientName("");
      setPatientEmail("");
      setNotes("");
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-center">Upload Patient Details</h2>

      <input
        type="text"
        placeholder="Enter Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded outline-none text-sm"
      />

      <input
        type="email"
        placeholder="Enter Patient Email"
        value={patientEmail}
        onChange={(e) => setPatientEmail(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded outline-none text-sm"
      />

      <textarea
        placeholder="Write Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded outline-none text-sm resize-none"
        rows={3}
      />

      <label className="flex items-center justify-center w-full mb-3 py-6 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50 transition">
        <FiUploadCloud size={28} className="text-gray-500 mr-2" />
        <span className="text-sm text-gray-600">{file ? file.name : "Click to upload document"}</span>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.png"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm"
      >
        Upload Details
      </button>
    </div>
  );
};

export default UploadPatientDetails;
