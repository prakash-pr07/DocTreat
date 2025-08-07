


import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const ChatBox = ({ currentUserEmail }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);
  const hasAddedUser = useRef(false);

  const chatWith = JSON.parse(localStorage.getItem("chatWith"));
  const receiverEmail = chatWith?.email;

  // ✅ Register user to socket and listener
  useEffect(() => {
    if (currentUserEmail && !hasAddedUser.current) {
      socket.emit("addUser", currentUserEmail);
      hasAddedUser.current = true;
    }

    socket.on("receiveMessage", ({ senderEmail, text }) => {
      if (
        senderEmail === currentUserEmail ||
        senderEmail === receiverEmail
      ) {
        setChat((prev) => [...prev, { senderEmail, text }]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUserEmail, receiverEmail]);

  // ✅ Auto-fetch history on load
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!currentUserEmail || !receiverEmail) return;

      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/chat/history?senderEmail=${currentUserEmail}&receiverEmail=${receiverEmail}`
        );
        const data = await res.json();
        if (res.ok && data.success) {
          setChat(data.data);
        }
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    fetchChatHistory();
  }, [currentUserEmail, receiverEmail]);

  // ✅ Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSend = () => {
    if (!message.trim() || !receiverEmail) return;

    const msg = {
      senderEmail: currentUserEmail,
      receiverEmail,
      text: message,
    };

    socket.emit("sendMessage", msg);
    setChat((prev) => [...prev, msg]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full w-full bg-white p-2 border border-gray-300 rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-2 text-center">
        Chat with {receiverEmail || "Unknown"}
      </h2>

      {/* 💬 Chat Area */}
      <div className="flex-1 overflow-y-auto p-2 border rounded mb-2">
        {chat.length > 0 ? (
          chat.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-1 rounded max-w-[80%] ${
                msg.senderEmail === currentUserEmail
                  ? "ml-auto bg-blue-100 text-right"
                  : "mr-auto bg-gray-100 text-left"
              }`}
            >
              <p className="text-xs text-gray-500">{msg.senderEmail}</p>
              <p>{msg.text}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No chat yet.</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ✍️ Input */}
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          className="flex-grow border border-gray-400 p-2 rounded-l"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
