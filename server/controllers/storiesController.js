import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary.js";
import Story from "../models/Story.js";

// Get all stories
export const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a story (admin only)
export const updateStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, slides } = req.body;

    const story = await Story.findById(id);
    if (!story) return res.status(404).json({ message: "Story not found" });

    // Optional: check if admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    story.title = title;
    story.category = category;
    story.slides = slides;
    await story.save();

    res.json({ message: "Story updated successfully", story });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a story (admin only)
export const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    if (!story) return res.status(404).json({ message: "Story not found" });

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await story.deleteOne();
    res.json({ message: "Story deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createStory = async (req, res) => {
  try {
    console.log("DEBUG: Request received to create story");
    console.log("Request body:", req.body); // shows title, category, slides

    const { title, category, slides } = req.body;
    console.log("Title:", title);
    console.log(" Category:", category);
    console.log(" Slides type:", typeof slides);
    console.log(" Slides value:", slides);

    let parsedSlides = slides;

    if (typeof slides === "string") {
      try {
        parsedSlides = JSON.parse(slides);
        console.log("Parsed slides successfully:", parsedSlides);
      } catch (error) {
        console.error(" JSON parse failed:", error.message);
        return res.status(400).json({ message: "Invalid slides format" });
      }
    }

    if (!parsedSlides || parsedSlides.length === 0) {
      console.error("No slides received");
      return res.status(400).json({ message: "No slides provided" });
    }

    const newStory = await Story.create({
      title,
      category,
      slides: parsedSlides,
      createdBy: req.user._id,
    });

    console.log("Story created:", newStory);
    return res.status(201).json(newStory);
  } catch (err) {
    console.error("Error creating story:", err);
    return res.status(500).json({ message: "Server error creating story" });
  }
};




export const getStory = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) {
    res.status(404);
    throw new Error("Story not found");
  }
  res.json(story);
});

