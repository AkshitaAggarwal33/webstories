import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Multer will save file temporarily in /uploads
const upload = multer({ dest: "uploads/" });

// Middleware to upload to Cloudinary
export const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const isVideo = req.file.mimetype.startsWith("video/");

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "webstories_uploads",
      resource_type: isVideo ? "video" : "image",
    });

    // Delete temp file after upload
    fs.unlinkSync(filePath);

    req.uploadedFileUrl = result.secure_url;
    next();
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

export default upload;



