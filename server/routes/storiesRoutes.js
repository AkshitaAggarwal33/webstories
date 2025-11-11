import express from "express";
import upload, { uploadToCloudinary } from "../middleware/uploadMiddleware.js";
import {
  createStory,
  getStories,
  getStory,
  updateStory,
  deleteStory,
} from "../controllers/storiesController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload route
router.post("/upload", upload.single("file"), uploadToCloudinary, (req, res) => {
  if (!req.uploadedFileUrl) {
    return res.status(400).json({ message: "Upload failed" });
  }
  res.json({ url: req.uploadedFileUrl });
});

// CRUD routes
router.get("/", getStories);

// Create a new story (must be logged in)
router.post("/", protect, createStory);

// Update story (admin only)
router.put("/:id", protect, updateStory);

// Delete story (admin only)
router.delete("/:id", protect, deleteStory);



export default router;

