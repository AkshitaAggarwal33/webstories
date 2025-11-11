import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const { setUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const endpoint = isSignup ? "/auth/signup" : "/auth/login";
      const res = await API.post(endpoint, { email, password });
  
      console.log("Login response:", res.data); 
      // Check if backend actually returned user
      if (res.data && res.data.user) {
        const loggedUser = res.data.user;
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        setUser(loggedUser);
  
        alert(`Welcome, ${loggedUser.name || "User"}!`);
        nav("/stories");
      } else {
        alert("Unexpected response format");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Invalid credentials or server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <div className="flex flex-col md:flex-row items-center justify-center flex-grow">
        {/* Left Section - Quotes or Illustration */}
        <div className="md:w-1/2 text-center md:text-left px-10 py-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">WebStories</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Create, explore, and share inspiring stories in image and video
            format. Let your creativity speak!
          </p>
          <img
            src="https://illustrations.popsy.co/gray/storytelling.svg"
            alt="Stories illustration"
            className="max-w-sm mx-auto md:mx-0"
          />
        </div>

        {/* Right Section - Login/Signup Card */}
        <div className="md:w-1/2 w-full max-w-md bg-white p-8 rounded-lg shadow-lg mx-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isSignup ? "Create an Account" : "Login to Your Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignup(false)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login here
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsSignup(true)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign up here
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
