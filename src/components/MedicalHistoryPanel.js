// // ✅ MedicalHistoryPanel Component: Center Section (Expandable Notes)

// import React, { useState } from "react";

// const MedicalHistoryPanel = ({ notes }) => {
//   const [expandedId, setExpandedId] = useState(null);

//   const toggleExpand = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   return (
//     <div className="w-full p-6 overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-4">Medical History</h2>
//       {notes.length === 0 ? (
//         <p className="text-gray-600">No Medical History</p>
//       ) : (
//         <div className="space-y-4">
//           {notes.map((note) => (
//             <div
//               key={note._id}
//               className="border border-gray-300 p-3 rounded shadow bg-white cursor-pointer"
//               onClick={() => toggleExpand(note._id)}
//             >
//               <div className="flex justify-between items-center">
//                 <h3 className="font-semibold text-gray-800">
//                   {note.fileName}
//                 </h3>
//                 <p className="text-xs text-gray-400">
//                   {new Date(note.uploadedAt).toLocaleString()}
//                 </p>
//               </div>
//               {expandedId === note._id && (
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-600 mb-2">{note.notes}</p>
//                   <a
//                     href={note.documentUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     📄 View Full Document
//                   </a>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MedicalHistoryPanel;




import React, { useState } from "react";

const MedicalHistoryPanel = ({ notes }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Medical History</h2>

      {notes.length === 0 ? (
        <p className="text-gray-600">No Medical History</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="border border-gray-300 p-3 rounded shadow bg-white cursor-pointer"
              onClick={() => toggleExpand(note._id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  {note.fileName}
                </h3>
                <p className="text-xs text-gray-400">
                  {new Date(note.uploadedAt).toLocaleString()}
                </p>
              </div>

              {expandedId === note._id && (
                <div className="mt-2">
                  {note.notes && (
                    <p className="text-sm text-gray-600 mb-2">{note.notes}</p>
                  )}
                  <a
                    href={note.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    📄 View Full Document
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalHistoryPanel;
