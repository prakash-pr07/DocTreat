// src/pages/AskAI.js

import React, { useState } from "react";
import axios from "axios";

const AskAI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Show user's message immediately
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/v1/ask-ai", {
        message: input,
      });

      const aiReply = res.data.reply || "Sorry, I couldn't understand.";

      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Server error occurred. Please try again later.",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-4 flex flex-col h-[80vh]">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">
          Ask AI (Medical Assistant)
        </h2>

        {/* Chat Box */}
        <div className="flex-1 overflow-y-auto border rounded p-4 mb-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 text-sm p-2 rounded-lg max-w-[70%] ${
                msg.sender === "user"
                  ? "bg-blue-100 self-end ml-auto text-right"
                  : "bg-gray-200 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="text-sm text-gray-500">AI is typing...</div>
          )}
        </div>

        {/* Input Section */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your medical question..."
            className="flex-1 border border-gray-300 rounded px-4 py-2"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskAI;
