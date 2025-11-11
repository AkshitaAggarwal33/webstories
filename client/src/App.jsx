import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateStory from "./pages/CreateStory.jsx"
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ViewStories from "./pages/ViewStories.jsx";
import EditStory from "./pages/EditStory.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/stories" element={<ViewStories />} />
          <Route path="/create" element={<CreateStory />} />
          <Route path="/edit/:id" element={<EditStory />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}