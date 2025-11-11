import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";

export default function CreateStory() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [slides, setSlides] = useState([{ type: "image", url: "" }]);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const nav = useNavigate();

  const addSlide = () => {
    setSlides([...slides, { type: "image", url: "" }]);
  };

  const handleFileUpload = async (index, file) => {
    if (!file) return;
    setUploadingIndex(index);
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const res = await API.post("/stories/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // Log Cloudinary response
      console.log("Cloudinary upload response:", res.data);
  
      // Update the slides state properly
      setSlides((prevSlides) => {
        const updatedSlides = [...prevSlides];
        updatedSlides[index].url = res.data.url;  // <-- store Cloudinary URL
        return updatedSlides;
      });
  
      alert("File uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert(" Upload failed");
    } finally {
      setUploadingIndex(null);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Slides on submit:", slides);
    const hasFiles = slides.some((s) => s.url && s.url.trim() !== "");

    if (!title.trim() || !category.trim() || !hasFiles) {
      alert("Please fill all fields and upload at least one file.");
      return;
    }

    try {
      console.log("Submitting story:", { title, category, slides });
      await API.post("/stories", { title, category, slides });
      alert("🎉 Story created successfully!");
      nav("/stories");
    } catch (err) {
      console.error(err);
      alert("❌ Error creating story");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create New Story
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Story Title
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
              placeholder="Enter story title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Category
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. Travel, Motivation"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          {/* Slides */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Slides
            </label>

            {slides.map((slide, index) => (
              <div
                key={index}
                className="bg-gray-50 border rounded-lg p-4 mb-4 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <select
                    value={slide.type}
                    onChange={(e) =>
                      setSlides((prev) => {
                        const copy = [...prev];
                        copy[index].type = e.target.value;
                        return copy;
                      })
                    }
                    className="border p-2 rounded w-40"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>

                  <input
                    type="file"
                    accept={slide.type === "video" ? "video/*" : "image/*"}
                    onChange={(e) =>
                      handleFileUpload(index, e.target.files[0])
                    }
                    className="border p-2 rounded bg-gray-100 cursor-pointer"
                  />

                  {uploadingIndex === index && (
                    <p className="text-blue-500 text-sm">Uploading...</p>
                  )}

                  {slide.url && (
                    <div className="mt-2">
                      {slide.type === "image" ? (
                        <img
                          src={slide.url}
                          alt="preview"
                          className="w-full h-60 object-cover rounded"
                        />
                      ) : (
                        <video
                          src={slide.url}
                          controls
                          className="w-full h-60 object-cover rounded"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addSlide}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded w-full font-semibold"
            >
              + Add Another Slide
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 font-semibold"
          >
            Create Story
          </button>
        </form>
      </div>
    </div>
  );
}


