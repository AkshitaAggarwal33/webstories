import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
  type: { type: String, enum: ["image", "video"], required: true },
  url: { type: String, required: true },
  public_id: { type: String },
  animation: { type: String },
});

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    slides: [slideSchema],
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);
export default Story;