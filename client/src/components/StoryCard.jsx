import React from "react";

export default function StoryCard({ story }) {
  const thumb = story.slides[0]?.url || "";
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform">
      <img
        src={thumb}
        alt={story.title}
        className="w-full h-52 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-lg">{story.title}</h3>
        <p className="text-sm text-gray-500">
          {new Date(story.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}