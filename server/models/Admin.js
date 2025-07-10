import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  phoneNo:   { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String, required: true },
  password:  { type: String, required: true },   // ✅ Add this
  role:      { type: String, default: "Admin" },
});

export default mongoose.model("Admin", adminSchema);
