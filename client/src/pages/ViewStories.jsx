import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";
import AuthContext from "../context/AuthContext";
import StoryViewer from "../components/StoryViewer";

export default function ViewStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch stories from backend
  const fetchStories = async () => {
    try {
      const res = await API.get("/stories");
      console.log("Fetched stories from backend:", res.data);
  
      // 🧠 Ensure slides is always an array, but don't overwrite existing data
      const safeStories = res.data.map((story) => ({
        ...story,
        slides: Array.isArray(story.slides) ? story.slides : [],
      }));
  
      setStories(safeStories);
    } catch (err) {
      console.error("Error fetching stories:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete story (admin only)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      await API.delete(`/stories/${id}`);
      alert("🗑️ Story deleted successfully!");
      setStories((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting story:", err);
      alert("❌ Failed to delete story.");
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-gray-500 text-lg">
          Loading stories...
        </div>
      </div>
    );
  }

  // No stories available
  if (!loading && stories.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-gray-600 text-lg">
          No stories available yet.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          All Stories
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200 flex flex-col justify-between"
              onClick={() => setSelectedStory(story)}
            >
              {/* Story Title */}
              <div>
                <h2 className="text-xl font-semibold mb-1 text-gray-900">
                  {story.title}
                </h2>
                <p className="text-gray-600 mb-3 italic text-sm">
                  {story.category}
                </p>

                {/* ✅ Safe media rendering */}
                {story.slides && story.slides.length > 0 && story.slides[0]?.url ? (
                  story.slides[0].type === "image" ? (
                    <img
                      src={story.slides[0].url}
                      alt={story.title}
                      className="rounded-md h-48 w-full object-cover mb-3"
                    />
                  ) : (
                    <video
                      src={story.slides[0].url}
                      controls
                      className="rounded-md h-48 w-full object-cover mb-3"
                    />
                  )
                ) : (
                  <div className="bg-gray-200 h-48 w-full flex items-center justify-center text-gray-500 rounded-md mb-3">
                    No media available
                  </div>
                )}

                {/* Created by */}
                <p className="text-sm text-gray-500">
                  Created by:{" "}
                  <span className="font-semibold">
                    {story.createdBy?.name || "Admin"}
                  </span>
                </p>
              </div>

              {/* Admin actions */}
              {user?.role === "admin" && (
                <div className="flex gap-3 mt-4">
                  <Link
                    to={`/edit/${story._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(story._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                    onClick={() => setSelectedStory(story)}
                  >
                    View
                  </button>
                </div>
              )}

              {user?.role === 'user' && (
                <button
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                onClick={() => setSelectedStory(story)}
                >
                View
              </button>
              )}
              
            </div>
          ))}
        </div>
      </div>

      {/* === Story Viewer Overlay === */}
      {selectedStory && (
      <StoryViewer
        story={selectedStory}
        onClose={() => setSelectedStory(null)} 
      />
    )}
    </div>
  );
}
