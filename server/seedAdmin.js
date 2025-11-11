import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/webStoriesApp`);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  await connectDB();

  const existingAdmin = await User.findOne({ email: "admin@webstories.com" });
  if (existingAdmin) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10); // hash the password

  const adminUser = new User({
    name: "Admin",
    email: "admin@webstories.com",
    password: hashedPassword,
    role: "admin",
  });

  await adminUser.save();
  console.log("Admin seeded successfully: admin@webstories.com / Admin@123");
  process.exit(0);
};

seedAdmin();