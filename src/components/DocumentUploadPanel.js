
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const DocumentUploadPanel = ({ onSeeHistory }) => {
//   const [fileName, setFileName] = useState("");
//   const [notes, setNotes] = useState("");
//   const [document, setDocument] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleUpload = async () => {
//     if (!fileName || !document) {
//       return toast.error("File name and document are required.");
//     }

//     try {
//       setIsUploading(true);
//       const formData = new FormData();
//       formData.append("fileName", fileName);
//       formData.append("notes", notes);
//       formData.append("patientEmail", user._id);
//       formData.append("document", document);

//       await axios.post("/api/medical-notes/upload", formData);
//       toast.success("Document Saved Successfully");
//       setFileName("");
//       setNotes("");
//       setDocument(null);
//     } catch (error) {
//       toast.error("Upload failed");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="w-full h-full p-4">
//       <div className="h-full w-full bg-white border border-gray-300 rounded-xl p-6 shadow-xl flex flex-col items-center justify-between">
//         <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-4 py-2 rounded-full mb-4 w-full text-center">
//           Upload Your Document
//         </button>

//         <input
//           type="text"
//           value={fileName}
//           onChange={(e) => setFileName(e.target.value)}
//           placeholder="File Name"
//           className="w-full mb-2 p-2 border rounded text-sm"
//         />

//         <textarea
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//           placeholder="Mark Your Points"
//           rows={5}
//           className="w-full mb-2 p-2 border rounded text-sm resize-none"
//         />

//         <div className="flex items-center justify-center mb-2">
//           <label className="cursor-pointer flex items-center gap-2 text-purple-700">
//             <span className="text-2xl">📄</span>
//             <input
//               type="file"
//               className="hidden"
//               onChange={(e) => setDocument(e.target.files[0])}
//             />
//           </label>
//         </div>

//         <button
//           onClick={handleUpload}
//           disabled={isUploading}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mb-2"
//         >
//           {isUploading ? "Uploading..." : "Upload"}
//         </button>

//         <button
//           onClick={onSeeHistory}
//           className="mt-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
//         >
//           See Medical History
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DocumentUploadPanel;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DocumentUploadPanel = ({ onSeeHistory }) => {
  const [fileName, setFileName] = useState("");
  const [notes, setNotes] = useState("");
  const [document, setDocument] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      toast.error("Please login first.");
      navigate("/login");
    }
  }, []);

  const handleUpload = async () => {
    if (!fileName || !document) {
      return toast.error("File name and document are required.");
    }

    if (!user?._id) {
      return toast.error("User not found. Please login again.");
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("notes", notes);
      formData.append("patientEmail", user.email);
      formData.append("document", document);

      const res = await axios.post("/api/medical-notes/upload", formData);

      if (res.data.success) {
        toast.success("Document Saved Successfully");
        setFileName("");
        setNotes("");
        setDocument(null);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Upload failed");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full h-full p-4">
      <div className="h-full w-full bg-white border border-gray-300 rounded-xl p-6 shadow-xl flex flex-col items-center justify-between">
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-4 py-2 rounded-full mb-4 w-full text-center">
          Upload Your Document
        </button>

        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="File Name"
          className="w-full mb-2 p-2 border rounded text-sm"
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Mark Your Points"
          rows={5}
          className="w-full mb-2 p-2 border rounded text-sm resize-none"
        />

        <div className="flex items-center justify-center mb-2">
          <label className="cursor-pointer flex items-center gap-2 text-purple-700">
            <span className="text-2xl">📄</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setDocument(e.target.files[0])}
            />
          </label>
        </div>

        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mb-2"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>

        <button
          onClick={onSeeHistory}
          className="mt-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        >
          See Medical History
        </button>
      </div>
    </div>
  );
};

export default DocumentUploadPanel;
