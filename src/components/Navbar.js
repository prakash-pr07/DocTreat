import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 triggers re-render on route change

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]); // 👈 this makes it reactive on login/logout

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-blue-300 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold text-white">
        <span className="text-white">Doc</span>
        <span className="text-yellow-300">Treat</span>
      </div>

      <div className="flex-1 flex justify-center space-x-6 text-lg">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/chatbot" className="hover:underline">Ask AI</Link>
        <Link to="/connect-doctors" className="hover:underline">Connect Doctors</Link>
        <Link to={user?.role === "Doctor" ? "/doctor/dashboard" : "/patient/dashboard"} className="hover:underline">Dashboard</Link>
      </div>

      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/signup">
              <button className="bg-white text-blue-700 px-4 py-1 rounded hover:bg-blue-100">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-blue-700 px-4 py-1 rounded hover:bg-blue-800">
                Login
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-white"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
