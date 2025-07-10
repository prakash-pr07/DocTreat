// socket.js
import { Server } from "socket.io";
import Message from "../models/Message.js"; // 🟡 your MongoDB model for storing chat history

const users = new Map();

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
    pingInterval: 25000,
    pingTimeout: 60000,
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);

    socket.on("addUser", (email) => {
      users.set(email, socket.id);
      console.log("✅ User added:", email);
    });

    socket.on("sendMessage", async ({ senderEmail, receiverEmail, text }) => {
      // 1. Save to DB
      const newMessage = new Message({ senderEmail, receiverEmail, text });
      await newMessage.save();

      // 2. Send to receiver if online
      const receiverSocket = users.get(receiverEmail);
      if (receiverSocket) {
        io.to(receiverSocket).emit("receiveMessage", { senderEmail, text });
      }
    });

    socket.on("disconnect", () => {
      for (let [email, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(email);
          console.log("❌ User disconnected:", email);
        }
      }
    });
  });
};




// // utils/socket.js

// import { Server } from "socket.io";
// import Message from "../models/Message.js"; // ✅ message model

// const users = new Map(); // email => socket.id

// export const setupSocket = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:3000",
//       credentials: true,
//     },
//     pingInterval: 25000,
//     pingTimeout: 60000,
//   });

//   io.on("connection", (socket) => {
//     console.log("🔌 Socket connected:", socket.id);

//     socket.on("addUser", (email) => {
//       users.set(email, socket.id);
//       console.log("✅ User added:", email);
//     });

//     socket.on("sendMessage", async ({ senderEmail, receiverEmail, text }) => {
//       try {
//         // ✅ Save to MongoDB
//         const newMsg = new Message({ senderEmail, receiverEmail, text });
//         await newMsg.save();

//         const receiverSocketId = users.get(receiverEmail);
//         if (receiverSocketId) {
//           io.to(receiverSocketId).emit("receiveMessage", {
//             senderEmail,
//             text,
//           });
//         }
//       } catch (err) {
//         console.error("❌ Error saving message:", err);
//       }
//     });

//     socket.on("disconnect", () => {
//       for (let [email, id] of users.entries()) {
//         if (id === socket.id) {
//           users.delete(email);
//           console.log("❌ User disconnected:", email);
//           break;
//         }
//       }
//     });
//   });

//   return io;
// };
