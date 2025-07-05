// // src/pages/Login.js

// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:8000/api/v1/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success("Login successful!");

//         // Save token and user info in localStorage (if needed)
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // 🔁 Redirect based on role
//         const role = data.user?.role;
//         setTimeout(() => {
//           if (role === "Doctor") {
//             navigate("/doctor/dashboard");
//           } else if (role === "Patient") {
//             navigate("/patient/dashboard");
//           } else {
//             toast.error("Unknown user role!");
//           }
//         }, 1000);
//       } else {
//         toast.error(data.message || "Login failed!");
//       }
//     } catch (error) {
//       toast.error("Server error occurred!");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-yellow-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
//           Login to Your Account
//         </h2>

//         <label className="block mb-2 text-sm font-semibold">Email</label>
//         <input
//           type="email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//         />

//         <label className="block mb-2 text-sm font-semibold">Password</label>
//         <input
//           type="password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-6 border rounded"
//         />

//         <button
//           type="submit"
//           className="bg-blue-800 hover:bg-blue-900 text-white w-full py-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;



// src/pages/Login.js

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");

        // Save token and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // 🔁 Redirect based on role
        const role = data.user?.role;

        setTimeout(() => {
          if (role === "Doctor") {
            navigate("/doctor/dashboard");
          } else {
            // ✅ If unknown, treat like Patient
            navigate("/patient/dashboard");
          }
        }, 1000);
      } else {
        toast.error(data.message || "Login failed!");
      }
    } catch (error) {
      toast.error("Server error occurred!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
          Login to Your Account
        </h2>

        <label className="block mb-2 text-sm font-semibold">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2 text-sm font-semibold">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-900 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
