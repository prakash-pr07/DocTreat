

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    state: "",
    role: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      city,
      state,
      role,
    } = formData;

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !city || !state || !role) {
      toast.error("Please fill all fields");
      return false;
    }

    if (!email.endsWith("@gmail.com")) {
      toast.error("Please enter a valid Gmail address");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const res = await axios.post("http://localhost:8000/api/v1/send-otp", {
        email: formData.email,
      });

      if (res.data.success) {
        toast.success("OTP sent to your email");
        setOtpSent(true);
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    }
  };

  const handleVerifyOtpAndSignup = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const verifyRes = await axios.post("http://localhost:8000/api/v1/verify-otp", {
        email: formData.email,
        otp,
      });

      if (!verifyRes.data.success) {
        return toast.error(verifyRes.data.message || "Invalid or expired OTP");
      }

      const signupRes = await axios.post("http://localhost:8000/api/v1/signup", {
        ...formData,
      });

      if (signupRes.data.success) {
        toast.success("Signup successful");
        navigate("/login");
      } else {
        toast.error(signupRes.data.message || "Signup failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error during signup");
    }
  };





  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* ✅ Left - Signup Form */}
      <div className="md:w-1/2 w-full bg-white flex justify-center items-center p-6">

        {/* <form className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800  p-8 rounded-lg shadow-xl max-w-md w-full space-y-4"> */}
        <form
            className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800   p-8 rounded-xl max-w-md w-full space-y-4 
             shadow-[0_0_40px_rgba(139,92,246,0.4)] 
             border-[3px] border-transparent 
             outline outline-2 outline-purple-500/30 
             hover:shadow-[0_0_60px_rgba(96,165,250,0.5)] 
             transition-all duration-1000 ease-in-out">
          <h2 className="text-2xl font-bold text-center">Signup</h2>

          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="p-2 border rounded" />
            <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="p-2 border rounded" />
          </div>

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded" />

          <div className="grid grid-cols-2 gap-4">
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="p-2 border rounded" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="p-2 border rounded" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="p-2 border rounded" />
            <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="p-2 border rounded" />
          </div>

          <select name="role" value={formData.role} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select Role</option>
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>

          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900"
          >
            Send OTP
          </button>

          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <button
                onClick={handleVerifyOtpAndSignup}
                className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
              >
                Verify OTP & Signup
              </button>
            </>
          )}
        </form>
      </div>

      {/* ✅ Right - Hospital Image with Zoom + Border + Shadow */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white">
        {/* <div className="w-3/4 h-3/4 rounded-lg border-4 border-blue-300 shadow-2xl overflow-hidden transition-transform duration-[2000ms] hover:scale-105"> */}
        <div className="w-3/4 h-3/4 rounded-xl overflow-hidden
             shadow-[0_0_40px_rgba(139,92,246,0.4)]
             hover:shadow-[0_0_60px_rgba(96,165,250,0.5)]
             transition-all duration-1000 ease-in-out border-[3px] border-transparent
             outline outline-2 outline-purple-500/30">
          <img
            src="/images/signupDoc.png"
            alt="Doctors standing"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  );
};

export default SignupPage;
