// config/database.js
import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  }
};

