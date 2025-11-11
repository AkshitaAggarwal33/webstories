import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
 

  const handleLogout = () => {
    logout();
    nav("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo / Brand */}
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-blue-400 transition"
      >
        WebStories
      </Link>

      {/* Menu Links */}
      <div className="flex items-center gap-4">
        

        {user ? (
          <>
            {/* Admin options */}
            {user.role === "admin" && (
              <Link
                to="/create"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                + Create Story
              </Link>
            )}

            

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Logout
            </button>
          </>
        ) : (
          // Not logged in → show Login/Signup
          <Link
            to="/"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold text-sm transition"
          >
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
}
