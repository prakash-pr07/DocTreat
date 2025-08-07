// models/Message.js

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderEmail: {
      type: String,
      required: true,
    },
    receiverEmail: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
