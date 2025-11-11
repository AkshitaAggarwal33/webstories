import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);
      nav("/admin");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white shadow-md rounded-lg p-8 w-80 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}