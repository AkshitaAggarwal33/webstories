import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";

export default function EditStory() {
  const { id } = useParams();
  const nav = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await API.get(`/stories`);
        const found = res.data.find((s) => s._id === id);
        setStory(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [id]);

  const handleChange = (field, value) => {
    setStory({ ...story, [field]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/stories/${id}`, {
        title: story.title,
        category: story.category,
        slides: story.slides,
      });
      alert(" Story updated!");
      nav("/stories");
    } catch (err) {
      alert(" Failed to update story");
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!story) return <p className="text-center mt-10">Story not found</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Story</h1>

        <form onSubmit={handleSave} className="space-y-4">
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={story.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={story.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}