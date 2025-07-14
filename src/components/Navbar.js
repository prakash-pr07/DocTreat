
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Ask AI", path: "/ask-ai" },
    { name: "Connect Doctors", path: "/connect-doctors" },
    {
      name: "Dashboard",
      path: user?.role === "Doctor" ? "/doctor/dashboard" : "/patient/dashboard",
    },
  ];

  return (
    <nav className="border-4 border-black bg-gradient-to-br from-purple-800 to-blue-800 text-white px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row justify-between items-center shadow-lg">
      {/* Logo */}
      <div className="text-2xl font-bold mb-3 sm:mb-0">
        <span className="text-white">Doc</span>
        <span className="text-yellow-300">Treat</span>
      </div>

      {/* Nav Links */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm sm:text-base font-semibold mb-3 sm:mb-0">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="px-3 sm:px-4 py-1 border-2 border-black text-black bg-white rounded shadow-md hover:bg-gradient-to-br hover:from-purple-800 hover:to-blue-800 hover:text-white transition-all duration-200"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-2">
        {!user ? (
          <>
            <Link to="/signup">
              <button className="px-3 sm:px-4 py-1 font-bold border-2 border-black text-black bg-white rounded shadow-md hover:bg-gradient-to-br hover:from-purple-800 hover:to-blue-800 hover:text-white transition-all duration-200">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="px-3 sm:px-4 py-1 font-bold border-2 border-black text-black bg-white rounded shadow-md hover:bg-gradient-to-br hover:from-purple-800 hover:to-blue-800 hover:text-white transition-all duration-200">
                Login
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-3 sm:px-4 py-1 font-bold border-2 border-black text-black bg-white rounded shadow-md hover:bg-gradient-to-br hover:from-purple-800 hover:to-blue-800 hover:text-white transition-all duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
