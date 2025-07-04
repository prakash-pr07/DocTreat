// src/components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-300 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">LoGic Legal</h1>
      <div className="flex gap-4">
        <Link to="/" className="bg-blue-800 px-4 py-1 rounded hover:bg-blue-900">Home</Link>
        <Link to="/signup" className="bg-blue-800 px-4 py-1 rounded hover:bg-blue-900">Sign Up</Link>
        <Link to="/login" className="bg-blue-800 px-4 py-1 rounded hover:bg-blue-900">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
