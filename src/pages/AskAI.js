
import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";

const AskAI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div
        className="w-full max-w-4xl bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800  rounded-xl shadow-[0_0_40px_rgba(139,92,246,0.4)]
        hover:shadow-[0_0_60px_rgba(96,165,250,0.5)]
        border-[3px] border-transparent outline outline-2 outline-purple-500/30
        transition-all duration-1000 ease-in-out p-6 flex flex-col h-[85vh]"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Ask AI (Medical Assistant)
        </h2>

        {/* ✅ Chat History */}
        <div className="flex-1 overflow-y-auto bg-gray border rounded-lg p-4 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 text-sm p-3 rounded-lg max-w-[70%] whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-100 self-end ml-auto text-right"
                  : "bg-gray-200 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="text-sm text-gray-500 italic">AI is typing...</div>
          )}
        </div>

        {/* ✅ Input & Send embedded like ChatGPT */}
        <div className="relative w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask your medical question..."
            className="w-full border border-gray-300 rounded-full px-5 py-3 pr-12 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
          >
            <FaPaperPlane size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskAI;
